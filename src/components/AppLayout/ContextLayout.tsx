"use client";
import { StateProvider } from "@/context/StateProvider";
import { ReactNode } from "react";
import AppLayout from "./AppLayout";
import { useLenis } from "@/hooks/useLenis";
import { usePathname } from "next/navigation";
import AppAdminLayout from "../Admin/Layout/AppAdminLayout";

const ContextLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const display = (pathname: string) => {
    if (pathname.startsWith("/admin")) {
      return <AppAdminLayout>{children}</AppAdminLayout>;
    } else {
      return <AppLayout>{children}</AppLayout>;
    }
  };

  return <StateProvider>{display(pathname)}</StateProvider>;
};

export default ContextLayout;
