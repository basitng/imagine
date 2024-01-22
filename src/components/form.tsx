"use client";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { LoadingCircle } from "./icons";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import axios from "axios";
import { toast } from "sonner";
//@ts-ignore
import promptmaker from "promptmaker";

interface FormProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Form({ setImage }: FormProps) {
  const [placeholder, setPlaceholder] = useState("");
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneration = async () => {
    setLoading(true);
    axios
      .post("/api/generate", { prompt })
      .then((res) => {
        setImage(res.data[0]);
        toast.success("Image generated successfully");
      })
      .catch((err) => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    textareaRef.current?.focus();
    const value = promptmaker();
    setPlaceholder(value);
  }, []);

  useEffect(() => {
    if (placeholder && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [prompt]);
  return (
    <div className="max-w-xl w-full mt-5 p-2 shadow-md flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <Textarea
        // ref={textareaRef}
        className="min-h-[45px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 border-none focus:outline-none"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setPrompt(e.target.value);
        }}
        value={prompt}
        autoFocus
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholder);
          }
        }}
      />
      <Button onClick={handleGeneration} className="w-12 h-8" variant={"ghost"}>
        {loading ? (
          <LoadingCircle />
        ) : (
          <SendHorizonal className="w-5 h-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
}
