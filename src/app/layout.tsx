import { Geist, Geist_Mono, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import ContextLayout from "@/components/AppLayout/ContextLayout";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

export const metadata = {
  title: "kumbang-heracles",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancing.variable}  antialiased`}
      >
        <ContextLayout>{children}</ContextLayout>
      </body>
    </html>
  );
}
