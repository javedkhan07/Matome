import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";


const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MATOME - AI-Powered Summerizes PDFs",
  description: "Save time and effort with our AI-powered PDF summarizer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${fontSans.variable}  antialiased`}>
          <div className=" relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"> {children} </main>
            <Footer />
          </div>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
