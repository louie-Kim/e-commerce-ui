import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 구글 SEO를 위해 어플이름 변경
/**
 * <Head>
 * <title>Trend - JY Clothes</title>
   <meta name="description" content="Trending fashion with JY store" />
   </Head>
 */
export const metadata: Metadata = {
  // title: "Trend - JY Clothes",
   title: {
    default: "Trend - JY Clothes",
    // 상품선택후 : product?.name | ?
    template: "%s | ?",
  },
  description: "JY store",
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
      >
        <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          {/* fixed components: NavBar, Footer */}
          <NavBar />
          {children}
          <Footer />
        </div>
        {/* Add to Cart 버튼 클릭 ->   toast.success("Product added to Cart") 메세지 나옴*/}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
