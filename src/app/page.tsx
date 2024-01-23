"use client";
import Form from "@/components/form";
import PhotoBooth from "@/components/photo-booth";
import React from "react";

export default function Page() {
  const [image, setImage] = React.useState("");
  return (
    <div className="justify-center flex items-center flex-col max-w-2xl px-2.5 xl:px-0">
      <h1 className="text-6xl font-display text-transparent bg-gradient-to-br from-black to-stone-500 bg-clip-text font-bold tracking-[-0.02em] ">
        Just - Imagine
      </h1>
      <p className="mt-6 text-center text-gray-500 [text-wrap:balance] md:text-xl">
        Generate beautiful AI art with one click. Powered by{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://unrealspeech.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unreal Speech
        </a>{" "}
        and{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://replicate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Replicate
        </a>
        .
      </p>
      <Form setImage={setImage} />
      <PhotoBooth
        image={
          image ||
          "https://replicate.delivery/pbxt/Iwojf52KreuubUk1IjkyBfCB63c14BVvE9w2Xx2d2Gp5Ue7IB/out-0.png"
        }
      />
    </div>
  );
}
