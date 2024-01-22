"use client";

import { SendHorizonal } from "lucide-react";
import { Textarea } from "./ui/textarea";

//@ts-ignore
import promptmaker from "promptmaker";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { generate } from "@/lib/action";
import { LoadingCircle } from "./icons";

export default function Form() {
  const [placeholder, setPlaceholder] = useState("");
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    textareaRef.current?.focus();
    const value = promptmaker();
    setPlaceholder(value);
  }, []);

  const handleImageGeneration = async () => {
    setLoading(true);
    const data = await generate({ prompt });
    if (data) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (prompt && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [prompt]);
  return (
    <div className="max-w-xl w-full mt-5 p-2 shadow-md flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <Textarea
        ref={textareaRef}
        className="min-h-[35px] focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 border-none focus:outline-none"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setPrompt(e.target.value);
        }}
        value={prompt}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Tab" && prompt === "") {
            setPrompt(placeholder);
          }
        }}
      />
      <Button
        onClick={handleImageGeneration}
        className="w-12 h-8"
        variant={"ghost"}
      >
        {loading ? (
          <LoadingCircle />
        ) : (
          <SendHorizonal className="w-5 h-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
}
