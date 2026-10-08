import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const hind_siliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description:
    "সারা দেশের প্রধান বাজারগুলোর নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস) প্রতিদিনের বাজার দর, সর্বনিম্ন ও সর্বোচ্চ মূল্যের বিশ্বস্ত তথ্য এক নজরে জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hind_siliguri.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className="flex-grow">{children}</main>
        <Footer></Footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
