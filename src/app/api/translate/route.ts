import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, tone, customTone } = body;

  if (!text || (!tone && !customTone)) {
    return NextResponse.json(
      { error: "Missing text or tone" },
      { status: 400 }
    );
  }

  const actualTone = tone === "Custom" ? customTone : tone;

  // ✨ Custom behavior for BS mode
  let systemMessage =
    "You are a helpful assistant that rewrites messages in specific tones. Keep it sharp, funny, and fast if the tone implies it. Return only the rewritten version.";
  let userPrompt = `Translate the following message into the "${actualTone}" style. Only return the rewritten text.\n\nOriginal: ${text}`;

  if (actualTone === "BS") {
  systemMessage =
    "You are George Carlin with a corporate decoder ring. Rewrite political, PR, or corporate messaging with ruthless honesty, wit, and sarcasm. Reveal what they actually mean underneath the fluff, fake gratitude, and jargon. Keep it clever, sharp, and funny.";
  userPrompt = `Take this overblown corporate message and reveal its true meaning with brutal clarity:\n\n${text}`;
}

if (actualTone === "Boomer") {
  systemMessage =
    "You're a sharp, modern interpreter of emotionally repressed, confusingly written Boomer messages. You rewrite them with clarity, edge, and wit — decoding their passive-aggression and generational baggage into straightforward, emotionally honest speech. Channel George Carlin: smart, slightly cynical, and funny.";
  userPrompt = `Decode and rewrite this Boomer-style message to sound like a real adult today — clear, direct, and modern. Be honest and cut the crap:\n\n${text}`;
}


  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0]?.message?.content?.trim();

    return NextResponse.json({ translation: reply || "No response." });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Failed to fetch translation." },
      { status: 500 }
    );
  }
}
