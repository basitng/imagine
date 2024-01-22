import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BuyMeACoffee } from "@/components/icons";
import Footer from "@/components/footer";

const clash = localFont({
  src: "./ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Imagine",
  description: "Generate images from text using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(clash.variable, inter.variable, "relative")}>
        <div className="bg-gradient-to-br fixed h-screen w-full from-violet-100 via-teal-50 to-amber-100">
          <Toaster />
          <div className="w-full top-0 z-50 fixed transition-all bg-white/0">
            <div className="h-16 max-w-screen-xl xl:mx-auto flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center font-display text-2xl"
              >
                <Image
                  src="https://spirals.vercel.app/logo.png"
                  alt="Logo image of a chat bubble"
                  width="30"
                  height="30"
                  className="mr-2 rounded-sm"
                  unoptimized
                />
                <p>Spirals</p>
              </Link>

              <div className="flex items-center space-x-4">
                <a
                  href="https://vercel.com/templates/next.js/spirals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hidden w-28 items-center justify-center space-x-2 rounded-full border border-black bg-black px-3 py-2.5 text-sm text-white transition-colors hover:bg-white hover:text-black sm:flex"
                >
                  <p>Sign in</p>
                </a>
              </div>
            </div>
          </div>
          <div className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
