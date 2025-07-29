"use client";

import { useState } from "react";

const toneOptions = ["Boomer", "BS", "Gary Vee", "Custom"];

const toneDescriptions: Record<string, string> = {
  Boomer:
    "Ever get a text from your parent that feels like a guilt trip wrapped in passive aggression and topped with a boomer-sized misunderstanding of emojis? This mode decrypts emotionally stunted, low-key hostile messages from the generation that thinks feelings are a sign of weakness and that “call me” means drop everything, it’s my turn to vent. We strip away the weaponized ellipses, decode the weird capitalization, and deliver the message like an actual adult would. Therapy in app form.",
  BS:
    "You’ve seen it: that LinkedIn post where someone “just wants to share a little story” about how they learned leadership from watching a squirrel cross the road. Or when “I’m humbled to announce” actually means “I’m bragging and want likes.” The BS Translator cuts through the corporate fluff, fake gratitude, and MBA-speak to reveal what people really mean: “I want a raise,” “I hate my boss,” or “Please clap.” It’s like having a built-in bullshit detector—but funnier.",
  "Gary Vee":
    "Need your text to sound like it just drank three espressos, launched a startup, and told a 12-year-old to 'crush it'? Gary Vee Mode transforms any message into a motivational, expletive-laced pep talk that sounds like it's being yelled at you from the front seat of a moving Uber. It's all hustle, no punctuation. Perfect for when you want your 'hey, just checking in' to hit like 'BRO. EXECUTE. STOP MAKING EXCUSES. POST THAT SH*T.'"};

export default function HomePage() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customToneInput, setCustomToneInput] = useState("");

  const getButtonLabel = (tone: string | null) => {
    if (!tone) return "Translate";
    return tone;
  };

  return (
    <main className="min-h-screen flex pb-0">
      {/* Sidebar for desktop */}
      <aside className="hidden sm:block fixed left-4 top-20 w-40 font-mono">
        <div className="bg-[#111] p-4 rounded-2xl shadow-md border border-gray-800 space-y-2">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-2 pl-1">
            Tones
          </h2>
          {toneOptions.map((tone) => (
            <div
              key={tone}
              onClick={() => {
                setSelectedTone(tone);
                setDescriptionVisible(true);
              }}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${
                selectedTone === tone
                  ? "bg-pink-600 text-white font-semibold"
                  : "text-gray-400 hover:bg-gray-800 hover:text-pink-400"
              }`}
            >
              <span className="mr-1">
                {tone === "Boomer" && "👴"}
                {tone === "BS" && "💼"}
                {tone === "Gary Vee" && "📢"}
                {tone === "Custom" && "❓"}
              </span>
              {tone}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow sm:ml-56 w-full bg-[#111] px-6 pt-20">
        {/* Mobile hamburger */}
        <div className="sm:hidden flex justify-end px-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-pink-500 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile tone menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden p-4 space-y-2">
            {toneOptions.map((tone) => (
              <div
                key={tone}
                onClick={() => {
                  setSelectedTone(tone);
                  setDescriptionVisible(true);
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer text-gray-400 hover:text-pink-400"
              >
                {tone}
              </div>
            ))}
          </div>
        )}

        {/* Tone Description */}
        {descriptionVisible && selectedTone && selectedTone !== "Custom" && (
          <div className="max-w-2xl w-full mx-auto mb-4 mt-4">
            <div className="p-3 border border-pink-500 text-sm text-gray-300 rounded bg-[#111]">
              {toneDescriptions[selectedTone]}
            </div>
          </div>
        )}

        {/* Custom Tone Input */}
        {selectedTone === "Custom" && (
          <div className="max-w-2xl w-full mx-auto mb-4 mt-4">
            <input
              type="text"
              value={customToneInput}
              onChange={(e) => setCustomToneInput(e.target.value)}
              placeholder="Describe your translation style"
              className="w-full p-2 border border-pink-500 rounded bg-black text-white placeholder:text-gray-500"
            />
          </div>
        )}

        {/* Spacer to push input down */}
        <div className="flex-grow" />

        {/* Input + Button */}
        <div className="max-w-2xl w-full mx-auto space-y-4 pb-4">
          <textarea
            placeholder="Paste text here..."
            className="w-full p-3 border border-gray-700 rounded-md resize-none min-h-[100px] bg-black text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={() => setDescriptionVisible(false)}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition"
          >
            {getButtonLabel(selectedTone)}
          </button>
        </div>
      </div>
    </main>
  );
}

