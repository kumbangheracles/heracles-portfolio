"use client";
import { useFrame, Canvas } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function MouseEffectScene({
  color = [1, 1, 1],
  intensity = 3.0,
  dissipation = 0.95,
}: {
  color?: [number, number, number];
  intensity?: number;
  dissipation?: number;
}) {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
      camera={{ zoom: 1 }}
    >
      <Smoke color={color} intensity={intensity} dissipation={dissipation} />
    </Canvas>
  );
}

function Smoke({
  color = [1, 1, 1],
  intensity = 3.0,
  dissipation = 0.95,
}: {
  color?: [number, number, number];
  intensity?: number;
  dissipation?: number;
}) {
  const dispRef = useRef<any>(null);
  const prevMouse = useRef<[number, number]>([2, 2]);
  const currentMouse = useRef<[number, number]>([2, 2]);
  const colorTRef = useRef(1.0);

  const simScene = useRef(new THREE.Scene());
  const simMaterial = useRef<THREE.ShaderMaterial | null>(null);

  const simUniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2() },
      uCurrentMouse: { value: new THREE.Vector2() },
      uPrevMouse: { value: new THREE.Vector2() },
      uPrevVelocity: { value: null },
      uPrevDensity: { value: null },
      uColor: { value: new THREE.Vector3(...color) },
      uPrevColor: { value: new THREE.Vector3(...color) },
      uColorT: { value: 1.0 },
      uIntensity: { value: intensity },
      uDissipation: { value: dissipation },
    }),
    [],
  );

  const dispUniforms = useMemo(
    () => ({
      uDensity: { value: null },
      uColor: { value: new THREE.Vector3(...color) },
      uPrevColor: { value: new THREE.Vector3(...color) },
      uColorT: { value: 1.0 },
    }),
    [],
  );

  // Setup sim scene sekali saat mount
  useEffect(() => {
    const mat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: simUniforms,
      vertexShader,
      fragmentShader: simFragmentShader,
    });
    simMaterial.current = mat;

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    simScene.current.add(mesh);

    return () => {
      mat.dispose();
      simScene.current.clear();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentMouse.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      currentMouse.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!simMaterial.current || !dispRef.current) return;
    const prev = simMaterial.current.uniforms.uColor.value.clone();
    simMaterial.current.uniforms.uPrevColor.value.copy(prev);
    simMaterial.current.uniforms.uColor.value.set(...color);
    dispRef.current.uniforms.uColor.value.set(...color);
    dispRef.current.uniforms.uPrevColor.value.copy(prev);
    colorTRef.current = 0.0;
  }, [color]);

  const targets = [
    useFBO({ count: 2, type: THREE.FloatType }),
    useFBO({ count: 2, type: THREE.FloatType }),
  ];
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!simMaterial.current || !dispRef.current) return;

    if (colorTRef.current < 1.0) {
      colorTRef.current = Math.min(colorTRef.current + 0.03, 1.0);
      simMaterial.current.uniforms.uColorT.value = colorTRef.current;
      dispRef.current.uniforms.uColorT.value = colorTRef.current;
    }

    const { gl, size } = state;
    const dpr = gl.getPixelRatio();

    simMaterial.current.uniforms.uResolution.value.set(
      size.width * dpr,
      size.height * dpr,
    );

    const x = currentMouse.current[0];
    const y = currentMouse.current[1];
    simMaterial.current.uniforms.uCurrentMouse.value.set(x, y);
    simMaterial.current.uniforms.uPrevMouse.value.set(
      prevMouse.current[0],
      prevMouse.current[1],
    );

    const currentTarget = targets[frameCount.current % 2];
    const prevTarget = targets[(frameCount.current + 1) % 2];

    simMaterial.current.uniforms.uPrevVelocity.value = prevTarget.textures[0];
    simMaterial.current.uniforms.uPrevDensity.value = prevTarget.textures[1];

    gl.setRenderTarget(currentTarget);
    gl.render(simScene.current, state.camera);
    gl.setRenderTarget(null);

    dispRef.current.uniforms.uDensity.value = currentTarget.textures[1];

    prevMouse.current = [x, y];
    frameCount.current++;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={dispRef}
        glslVersion={THREE.GLSL3}
        uniforms={dispUniforms}
        transparent
        vertexShader={vertexShader}
        fragmentShader={dispFragmentShader}
      />
    </mesh>
  );
}

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const simFragmentShader = `
precision mediump float;

layout(location = 0) out vec4 pc_FragVelocity;
layout(location = 1) out vec4 pc_FragDensity;

uniform sampler2D uPrevVelocity;
uniform sampler2D uPrevDensity;
uniform vec2 uResolution;
uniform vec2 uCurrentMouse;
uniform vec2 uPrevMouse;
uniform float uIntensity;
uniform float uDissipation;

float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 st = uv * 2.0 - 1.0;
  st.x *= aspect;

  vec2 mouseC = uCurrentMouse;
  vec2 mouseP = uPrevMouse;
  mouseC.x *= aspect;
  mouseP.x *= aspect;

  vec2 mouseVel = mouseC - mouseP;
  if (length(mouseVel) > 1.0) mouseVel = vec2(0.0);
  float dist = distToSegment(st, mouseP, mouseC);
  float strength = smoothstep(0.1, 0.0, dist);
  strength = pow(strength, 2.0);

  vec2 prevVel = texture(uPrevVelocity, uv).xy;
  vec2 movedVel = texture(uPrevVelocity, uv - prevVel * 0.01).xy;
  vec2 nextVel = movedVel * 0.96 + mouseVel * strength;

  float mouseSpeed = length(mouseVel);
  float prevDen = texture(uPrevDensity, uv + nextVel * 0.01).r;
  float nextDen = prevDen * uDissipation + strength * mouseSpeed * uIntensity;

  pc_FragVelocity = vec4(nextVel, 0.0, 1.0);
  pc_FragDensity = vec4(nextDen, nextDen, nextDen, nextDen);
}
`;

const dispFragmentShader = `
precision highp float;

out vec4 fragColor;

uniform sampler2D uDensity;
uniform vec3 uColor;
uniform vec3 uPrevColor;
uniform float uColorT;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(uDensity, 0));
  float density = texture(uDensity, uv).r;
  
  vec3 currentColor = mix(uPrevColor, uColor, uColorT);
  
  // Pastikan minimum brightness
  float minBrightness = 0.3;
  float brightness = max(length(currentColor), minBrightness);
  vec3 boostedColor = currentColor * (1.0 / brightness);
  
  fragColor = vec4(boostedColor * density, density);
}

`;
