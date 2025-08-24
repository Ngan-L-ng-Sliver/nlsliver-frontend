import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bạc Phú Quý Đà Nẵng - Ngân Lượng Silver",
  description:
    "Đại Lý Bạc Phú Quý Đà Nẵng, Chuyên cung cấp dịch vụ đầu tư bạc tích trữ uy tín. Hotline: 0763600889 | Địa Chỉ: 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
  keywords: [
    "bạc phú quý đà nẵng",
    "đại lý bạc phú quý đà nẵng",
    "phú quý bạc đà nẵng",
    "đại lý bạc đà nẵng",
    "phú quý đà nẵng",
    "mua bạc đà nẵng",
    "bạc phú quý tại đà nẵng",
    "đầu tư bạc đà nẵng",
    "bạc tích trữ đà nẵng",
    "bạc miếng đà nẵng",
    "đầu tư kim loại quý đà nẵng",
    "mua bán bạc đà nẵng",
    "bạc thỏi đà nẵng",
    "đầu tư an toàn đà nẵng",
    "tích trữ tài sản đà nẵng",
  ].join(", "),
  authors: [{ name: "Đại Lý Bạc Phú Quý Đà Nẵng" }],
  creator: "Đại Lý Bạc Phú Quý Đà Nẵng",
  publisher: "Đại Lý Bạc Phú Quý Đà Nẵng",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://nganluongsilver.com",
    siteName: "Đại Lý Bạc Phú Quý Đà Nẵng",
    title: "Bạc Phú Quý Đà Nẵng - Ngân Lượng Silver",
    description:
      "Đại Lý Bạc Phú Quý Đà Nẵng, Chuyên cung cấp dịch vụ đầu tư bạc tích trữ uy tín. Hotline: 0763600889 | Địa Chỉ: 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
    images: [
      {
        url: "/cover fanpage nls phu quy 2.png",
        width: 1200,
        height: 630,
        alt: "Bạc Phú Quý Đà Nẵng - Ngân Lượng Silver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bạc Phú Quý Đà Nẵng - Ngân Lượng Silver",
    description: "Đại Lý Bạc Phú Quý Đà Nẵng, Chuyên cung cấp dịch vụ đầu tư bạc tích trữ uy tín. Hotline: 0763600889 | Địa Chỉ: 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
    images: [
      "/cover fanpage nls phu quy 2.png",
    ],
  },
  alternates: {
    canonical: "https://nganluongsilver.com",
  },
  category: "Đầu tư kim loại quý",
  classification: "Business",
  other: {
    "geo.region": "VN-DN",
    "geo.placename": "Đà Nẵng",
    "geo.position": "16.0544;108.2022",
    ICBM: "16.0544, 108.2022",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut:
      "/favicon.ico",
    apple:
      "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <link rel="icon" type="image/png" href="/favicon.ico"></link>
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon.ico"></link>
      <link rel="apple-touch-icon" href="/favicon.ico"></link>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
