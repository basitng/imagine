import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BuyMeACoffee, Twitter } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  currentUser,
} from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(clash.variable, inter.variable, "relative")}>
          <div className="bg-gradient-to-br min-h-screen w-full from-indigo-100 via-orange-50 to-blue-100">
            <Toaster />
            <div className="w-full px-3 md:px-0 top-0 z-50 fixed transition-all bg-white/0">
              <div className="h-16 max-w-screen-xl xl:mx-auto flex items-center justify-between">
                <Link
                  href="/"
                  className="flex select-none items-center font-display text-xl md:text-2xl "
                >
                  _Imagine
                </Link>

                <div className="flex items-center space-x-2 md:space-x-4">
                  {user ? (
                    <SignOutButton>
                      <Button
                        variant={"outline"}
                        className="bg-transparent w-24 md:w-auto border-[#0f172a]"
                        size={"lg"}
                      >
                        Sign out
                      </Button>
                    </SignOutButton>
                  ) : (
                    <SignInButton>
                      <Button className="w-24 md:w-auto" size={"lg"}>
                        Sign in
                      </Button>
                    </SignInButton>
                  )}
                  <Link
                    target="_blank"
                    href="https://www.buymeacoffee.com/ajaga"
                  >
                    <Button
                      className="w-24 md:w-auto"
                      variant={"outline"}
                      size={"lg"}
                    >
                      <BuyMeACoffee className="w-6 h-6 mr-2" />
                      <span className="hidden md:visible">Buy me coffee</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex min-h-screen w-full flex-col items-center justify-center py-32">
              <a
                href="https://x.com/ajaga_abdbasit/status/1749806783160533204?s=20"
                target="_blank"
                rel="noreferrer"
                className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
              >
                <Twitter className="h-5 w-5 text-[#1d9bf0]" />
                <p className="text-sm font-semibold text-[#1d9bf0]">
                  Introducing Imagine
                </p>
              </a>
              {children}
              <Analytics />
            </div>
            {/* <Footer /> */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
