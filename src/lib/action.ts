import Replicate from "replicate";
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { WEBHOOK_URL } from "./constant";

interface bodyProps {
  prompt: string;
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});
export async function generate(body: bodyProps) {
  const prompt = body.prompt;

  const id = nanoid();
  const res = Promise.all([
    kv.hset(id, {
      prompt,
    }),
  ]);
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        width: 768,
        height: 768,
        prompt: prompt,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: "",
        prompt_strength: 0.8,
        num_inference_steps: 25,
      },
      webhook: `${WEBHOOK_URL}?id=${id}${
        process.env.REPLICATE_WEBHOOK_SECRET
          ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
          : ""
      }`,
      webhook_events_filter: ["completed"],
    }
  );

  console.log(res, output);
  return id;
}
