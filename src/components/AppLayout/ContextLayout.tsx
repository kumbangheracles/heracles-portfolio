"use client";
import { StateProvider } from "@/context/StateProvider";
import { ReactNode } from "react";
import AppLayout from "./AppLayout";
import { useLenis } from "@/hooks/useLenis";

const ContextLayout = ({ children }: { children: ReactNode }) => {
  useLenis();
  return (
    <StateProvider>
      <AppLayout>{children}</AppLayout>
    </StateProvider>
  );
};

export default ContextLayout;
