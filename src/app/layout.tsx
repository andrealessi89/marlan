
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";
import { ConfigProvider } from '@/providers/ConfigProvider'; 

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
      <head>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WG93WGNJ');
  `,
        }}
      />
      </head>
      <body className={inter.className}>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WG93WGNJ"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <ToastContainer />
        <TanstackProvider>
          <ConfigProvider>
          <div>{children}</div>
          </ConfigProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
