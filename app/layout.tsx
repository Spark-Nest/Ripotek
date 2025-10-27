
import "./../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.ripotek.com"),
  title: "Ripotek Technology Inc. - Data, BI, Fabric, Databricks, AI",
  description: "Design. Engineer. Deliver. Calgary-based consulting and training for Data Architecture, Engineering, Analytics, Power BI, Fabric, Databricks, and Generative AI.",
  openGraph: {
    title: "Ripotek Technology Inc.",
    description: "Enterprise-polished consulting and training - Azure, Fabric, Databricks, Power BI, AI.",
    url: "https://www.ripotek.com",
    siteName: "Ripotek Technology Inc.",
    images: [{ url: "/og_ripotek.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ripotek Technology Inc.",
    description: "Azure, Fabric, Databricks, Power BI, AI - consulting and training.",
    images: ["/og_ripotek.png"]
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
