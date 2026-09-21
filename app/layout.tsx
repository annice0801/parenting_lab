import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Parenting Lab 育兒神助手實驗室",
  description:
    "Parenting Lab 育兒神助手實驗室——當爸媽的好夥伴，用蒙特梭利精神與幼兒發展知識，為孩子篩選優質資源與教具，用溫暖陪伴減輕育兒路上的負擔。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-zh)]">
        {children}
      </body>
    </html>
  );
}
