// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { El_Messiri } from "next/font/google";

// ✅ Import and configure the global font
const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IAN Cares Foundation",
  description: "Healing with compassion and faith - IAN Cares Foundation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ Apply font to the entire site */}
      <body className={elMessiri.className}>{children}</body>
    </html>
  );
}
