
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marlan Catálogo",
  description: "Catálogo de produtos Marlan",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleTagManager gtmId="G-WG93WGNJ" />
      <ToastContainer />
        <TanstackProvider>
          <div>{children}</div>
        </TanstackProvider>
      </body>
    </html>
  );
}
