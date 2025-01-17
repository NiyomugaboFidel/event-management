import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  title: "Event Management System",
  description: "Event Management System || Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Toaster />
        <Navbar />
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
