
import "./globals.css";
import "./../styles/globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.ripotek.com"),
  title: "Ripotek — Data, BI, Fabric, Databricks, AI",
  description:
    "Ripotek helps enterprises design, engineer, and deliver modern data platforms: Azure, Microsoft Fabric, Databricks, Power BI, and Generative AI.",
  openGraph: {
    title: "Ripotek",
    description:
      "Modern consulting and training for Azure, Fabric, Databricks, Power BI, and AI.",
    url: "https://www.ripotek.com",
    siteName: "Ripotek",
    images: [{ url: "/og_ripotek.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ripotek",
    description:
      "Azure, Fabric, Databricks, Power BI, AI — consulting and training.",
    images: ["/og_ripotek.png"]
  }
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-brand",
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
