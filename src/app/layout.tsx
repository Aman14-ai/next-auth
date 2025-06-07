import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const calistoga = Calistoga({
  variable: "--font-serif",
  subsets: ["latin"],
  weight:["400"],
});


export const metadata: Metadata = {
  title: "auth",
  description: "Aman Kumar Choudhary's Authentication App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${calistoga.variable} antialiased font-sans bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
