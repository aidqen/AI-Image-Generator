import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavigation } from "@/components/AppNavigation";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Image AI Generator",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#0d0e12] pb-32`}>
        <Providers>
          <AppNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
