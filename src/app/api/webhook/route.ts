export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("id");

  if (process.env.REPLICATE_WEBHOOK_SECRET) {
    const secret = searchParams.get("secret") as string;
    if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
      return new Response("Invalid secret", { status: 401 });
    }
  }

  const body = await req.json();
  const { output } = body;

  if (!output) {
    return new Response("Missing output", { status: 400 });
  }

  console.log(output);
}
