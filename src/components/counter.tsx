"use client";
import { nFormatter } from "@/lib/utils";
import axios from "axios";
import React from "react";

export function GeneratedCount() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    axios.get("/api/generate").then((res) => {
      setCount(res.data);
      console.log(res.data);
    });
  });
  return <CountDisplay count={count} />;
}

export const CountDisplay = ({ count }: { count?: number }) => {
  return (
    <p
      className="mt-4 text-center text-sm text-gray-500"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {count ? nFormatter(count) : "..."} photos generated and counting!
    </p>
  );
};
