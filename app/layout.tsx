"use client"
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./providers/tanstackProvider";
import { Toaster } from 'sonner'
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { useEffect } from "react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      router.push('/')
    }
    if (role === 'admin' && !path.startsWith('/manager')) {
      router.push('/manager');
    }
    if (role === 'delivery') {
      router.push('/delivery');
    }
    if (role === 'pantry') {
      router.push('/pantry');
    }
  }, [path])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReactQueryProvider>
          <Toaster richColors />
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
