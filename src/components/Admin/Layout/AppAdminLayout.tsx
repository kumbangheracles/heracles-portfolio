"use client";
import CustomCursor from "@/components/CustomCursor";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import { useStateContext } from "@/hooks/useStateContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Image,
  CheckSquare,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  Activity,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PropTypes {
  children: ReactNode;
}

const LIST_SIDE_BAR = [
  { title: "Dashboard", href: "/admin/", icon: LayoutDashboard },
  { title: "Projects", href: "/admin/projects", icon: Activity },
  { title: "Peak Fiction", href: "/admin/peak-fiction", icon: FileText },
  { title: "Gallery", href: "/admin/gallery", icon: Image },
  { title: "My Tasks", href: "/admin/tasks", icon: CheckSquare, badge: 3 },
];

const BOTTOM_NAV = [
  { title: "Settings", href: "/admin/settings", icon: Settings },
  { title: "Log Out", href: "/logout", icon: LogOut },
];

const AppAdminLayout = ({ children }: PropTypes) => {
  const {} = useStateContext();
  const router = useRouter();
  const pathname = usePathname?.() ?? "";
  // const [collapsed, setCollapsed] = useState(false);
  // const { isMobile } = useViewport();

  // useEffect(() => {
  //   if (isMobile) {
  //     setCollapsed(true);
  //   }
  // }, [isMobile]);

  return (
    <main className="show-scrollbar">
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
        >
          <SidebarHeader className="px-2.5 py-[18px] pb-0">
            <div className="flex items-center justify-between px-1.5 pb-[18px] pt-1 min-h-[44px]">
              <span className="text-xl font-extrabold tracking-tight whitespace-nowrap group-data-[collapsible=icon]:hidden">
                Heracles<span className="text-sidebar-primary">.</span>
              </span>
              <SidebarTrigger className="flex items-center justify-center p-[5px] rounded-lg border border-sidebar-border bg-transparent text-sidebar-foreground opacity-50 cursor-pointer flex-shrink-0 transition-[opacity,background] duration-150 hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2.5 gap-0">
            <SidebarMenu className="gap-3">
              {LIST_SIDE_BAR.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => router.push(item.href)}
                      className={[
                        "relative flex items-center gap-2.5 w-full px-2.5 py-6 rounded-[9px]",
                        "text-sidebar-foreground text-[13.5px] font-medium cursor-pointer",
                        "whitespace-nowrap transition-[background,opacity] duration-[140ms]",
                        "hover:bg-sidebar-accent hover:opacity-100 hover:text-sidebar-accent-foreground",
                        isActive
                          ? "bg-sidebar-accent opacity-100 text-sidebar-accent-foreground"
                          : "bg-transparent opacity-60",
                      ].join(" ")}
                      tooltip={item.title}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-[22%] bottom-[22%] w-[3px] rounded-r-[3px] bg-sidebar-primary" />
                      )}
                      <item.icon size={17} className="flex-shrink-0" />
                      <span className="flex-1 overflow-hidden text-ellipsis">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="bg-sidebar-primary text-sidebar-primary-foreground text-[10px] font-bold rounded-[20px] px-[7px] py-px flex-shrink-0 group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="px-2.5 pb-[18px] gap-0">
            <SidebarSeparator className="mb-1.5 bg-sidebar-border" />

            <SidebarMenu className="gap-px">
              {BOTTOM_NAV.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    className="relative flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-[9px] border-none bg-transparent text-sidebar-foreground text-[13px] font-medium opacity-[0.45] cursor-pointer whitespace-nowrap transition-[background,opacity] duration-[140ms] hover:bg-sidebar-accent hover:opacity-75 hover:text-sidebar-accent-foreground"
                    tooltip={item.title}
                  >
                    <item.icon size={17} className="flex-shrink-0" />
                    <span className="flex-1 overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="flex items-center gap-2.5 px-1.5 pt-3 pb-0.5 border-t border-sidebar-border mt-1.5 group-data-[collapsible=icon]:hidden">
              <div className="w-[34px] h-[34px] rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                NN
              </div>
              <div>
                <p className="text-[13px] font-semibold m-0 mb-0.5 text-sidebar-foreground">
                  Neuer Nutzer
                </p>
                <p className="text-[11px] m-0 opacity-50 text-sidebar-foreground">
                  Administrator
                </p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen bg-background">
          <header className="h-[54px] flex items-center justify-between px-4 md:px-6 border-b border-border bg-background sticky top-0 z-30 gap-2">
            <SidebarTrigger className="md:hidden flex items-center justify-center p-[5px] rounded-lg border border-border bg-transparent text-foreground opacity-60 transition-[opacity,background] duration-150 hover:opacity-100 hover:bg-accent" />

            <div className="flex-1" />

            <div className="flex items-center gap-1.5">
              <SwitchThemeButton />
            </div>
          </header>

          <main className="flex-1 p-4 md:p-7 overflow-y-auto">
            <div className="hidden [@media(pointer:fine)]:block">
              <CustomCursor />
            </div>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default AppAdminLayout;
