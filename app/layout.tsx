
import "./../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ripotek Technology Inc.",
  description: "Design. Engineer. Deliver. Data Architecture, Engineering, Analytics, Power BI, and AI consulting & training.",
  icons: { icon: "/assets/ripotek_favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
