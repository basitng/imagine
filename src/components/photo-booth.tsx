"use client";

import { Copy, CopyCheck, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { useParams, useRouter } from "next/navigation";
import va from "@vercel/analytics";
import { toast } from "sonner";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PhotoBooth({ image }: { image: string | null }) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    setCopying(true);
    navigator.clipboard.writeText(image!).then(() => {
      setCopying(false);
      toast.success("Copied to clipboard!");
    });
  };
  return (
    <div className="relative mx-auto mt-6  w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200">
      {image && (
        <div className="flex absolute right-5 top-5 items-center space-x-2">
          <div className="w-9 h-9 justify-center border transition-all hover:scale-105 active:105 cursor-pointer flex shadow-sm items-center border-gray-200 bg-white rounded-full">
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy onClick={handleCopy} className="text-gray-500 w-4 h-4" />
            )}
          </div>
          <div className="w-9 h-9 justify-center border transition-all hover:scale-105 active:105 cursor-pointer flex shadow-sm items-center border-gray-200 bg-white rounded-full">
            <Download className="text-gray-500 w-4 h-4" />
          </div>
        </div>
      )}
      {image ? (
        <Image
          alt="output image"
          src={image}
          width={1280}
          height={1280}
          className="h-full object-cover"
          unoptimized
        />
      ) : (
        <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[140px] sm:pt-[280px]">
          <LoadingCircle />
          {id && (
            <div
              className="my-4 flex animate-fade-up flex-col items-center space-y-4 opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <p className="text-sm text-gray-500">
                This can take anywhere between 20s-30s to run.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
