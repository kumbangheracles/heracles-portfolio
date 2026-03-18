"use client";
import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: "2019",
    title: "Intern Mobile Developer",
    icon: "<>",
    company: "Lontar Lab.",
    location: "Bandung, Indonesia",
    description:
      "Started career in mobile development as an intern. The focus was on assisting in the creation of mobile applications.",
    side: "left",
    active: true,
  },
  {
    year: "2020",
    title: "Java Software Engineer",
    icon: "<>",
    company: "PT Collega Inti Pratama",
    location: "Jakarta, Indonesia",
    description:
      "Actively involved in the maintenance and development of Collega's Application Java Project Olibs Backend 724.",
    side: "right",
    active: false,
  },
  {
    year: "2022",
    title: "Frontend Developer",
    icon: "<>",
    company: "Startup XYZ",
    location: "Remote",
    description:
      "Built and maintained modern web applications using React and Next.js, focusing on performance and user experience.",
    side: "left",
    active: false,
  },
  {
    year: "2024",
    title: "Full Stack Engineer",
    icon: "<>",
    company: "Tech Corp",
    location: "Jakarta, Indonesia",
    description:
      "Leading development of scalable web platforms, bridging frontend elegance with robust backend architecture.",
    side: "right",
    active: false,
  },
];

function TimelineItem({ item, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full"
      style={{ marginBottom: "3rem" }}
    >
      {/* Left card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "3rem",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : isLeft
              ? "translateX(-40px)"
              : "translateX(0)",
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        }}
      >
        {isLeft && <Card item={item} align="right" />}
      </div>

      {/* Center dot + year */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          minWidth: "60px",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: item.active ? "#4a9eff" : "#3a4a6b",
            border: item.active ? "3px solid #7bc4ff" : "2px solid #4a5a7b",
            boxShadow: item.active ? "0 0 12px #4a9eff88" : "none",
            transition: "all 0.3s ease",
          }}
        />
        <span
          style={{
            marginTop: "6px",
            fontSize: "12px",
            color: item.active ? "#7bc4ff" : "#6b7a9b",
            fontFamily: "monospace",
            fontWeight: "600",
            letterSpacing: "0.05em",
          }}
        >
          {item.year}
        </span>
      </div>

      {/* Right card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "3rem",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : !isLeft
              ? "translateX(40px)"
              : "translateX(0)",
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        }}
      >
        {!isLeft && <Card item={item} align="left" />}
      </div>
    </div>
  );
}

function Card({ item, align }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maxWidth: "380px",
        width: "100%",
        backgroundColor: hovered ? "#1e2d4a" : "#172236",
        border: `1px solid ${hovered ? "#3a5a8a" : "#243350"}`,
        borderRadius: "10px",
        padding: "1.25rem 1.5rem",
        cursor: "default",
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? "0 8px 32px rgba(74, 158, 255, 0.1)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        textAlign: align,
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
          marginBottom: "6px",
        }}
      >
        {align === "left" && (
          <span
            style={{
              color: "#4a9eff",
              fontFamily: "monospace",
              fontSize: "13px",
            }}
          >
            {item.icon}
          </span>
        )}
        <span
          style={{
            color: item.active ? "#4a9eff" : "#e2e8f0",
            fontFamily: "monospace",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "0.02em",
          }}
        >
          {item.title}
        </span>
        {align === "right" && (
          <span
            style={{
              color: "#4a9eff",
              fontFamily: "monospace",
              fontSize: "13px",
            }}
          >
            {item.icon}
          </span>
        )}
      </div>

      {/* Company */}
      <p
        style={{
          color: "#c8d4e8",
          fontFamily: "monospace",
          fontSize: "13px",
          margin: "0 0 2px 0",
        }}
      >
        {item.company}
      </p>

      {/* Location */}
      <p
        style={{
          color: "#6b7a9b",
          fontFamily: "monospace",
          fontSize: "12px",
          margin: "0 0 10px 0",
        }}
      >
        {item.location}
      </p>

      {/* Description */}
      <p
        style={{
          color: "#8a9ab8",
          fontFamily: "monospace",
          fontSize: "12px",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function VerticalStepper() {
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setLineHeight((prev) => {
        if (prev < 100) return prev + 0.3;
        return 100;
      });
    };
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0f1829",
        padding: "4rem 2rem",
        fontFamily: "monospace",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p
          style={{
            color: "#6b7a9b",
            fontSize: "13px",
            letterSpacing: "0.1em",
            margin: "0 0 8px 0",
          }}
        >
          — EXPERIENCE —
        </p>
        <h2
          style={{
            color: "#e2e8f0",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: "700",
            margin: "0 0 8px 0",
            letterSpacing: "0.05em",
          }}
        >
          Career Timeline
        </h2>
        <p style={{ color: "#6b7a9b", fontSize: "13px", margin: 0 }}>
          A journey through professional milestones and growth.
        </p>
      </div>

      {/* Timeline */}
      <div
        ref={containerRef}
        style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Vertical line background */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#243350",
            transform: "translateX(-50%)",
          }}
        />

        {/* Animated line fill */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "1px",
            height: `${lineHeight}%`,
            backgroundColor: "#4a9eff",
            transform: "translateX(-50%)",
            boxShadow: "0 0 8px #4a9eff66",
            transition: "height 0.016s linear",
          }}
        />

        {/* Items */}
        {timelineData.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
