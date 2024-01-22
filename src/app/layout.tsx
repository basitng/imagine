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
import { Button } from "@/components/ui/button";

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
        <div className="bg-gradient-to-br fixed h-screen w-full from-indigo-100 via-orange-100 to-blue-100">
          <Toaster />
          <div className="w-full top-0 z-50 fixed transition-all bg-white/0">
            <div className="h-16 max-w-screen-xl xl:mx-auto flex items-center justify-between">
              <Link
                href="/"
                className="flex select-none items-center font-display text-2xl "
              >
                _Imagine
              </Link>

              <div className="flex items-center space-x-4">
                <Button size={"lg"}>Sign in</Button>
                <Link target="_blank" href="https://www.buymeacoffee.com/ajaga">
                  <Button variant={"outline"} size={"lg"}>
                    <BuyMeACoffee className="w-6 h-6 mr-2" />
                    Buy me coffee
                  </Button>
                </Link>
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
