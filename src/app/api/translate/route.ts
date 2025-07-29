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
      "You are a brutally honest assistant. You rewrite corporate, political, or PR messages with no filter, revealing what people actually mean.";
    userPrompt = `Rewrite the following in plain, brutally honest English. Remove all fake gratitude, jargon, and humblebrags:\n\n${text}`;
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
