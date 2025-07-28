"use client";

import { useState } from "react";

const toneOptions = ["Casual", "Formal", "Plain"];

const toneDescriptions: Record<string, string> = {
  Casual: "Informal, friendly tone",
  Formal: "Professional, respectful tone",
  Plain: "Simplified, clear English",
};

export default function HomePage() {
  const [selectedTone, setSelectedTone] = useState("Casual");
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getButtonLabel = (tone: string) => {
    if (!tone) return "Translate";
    const fromTones = ["Casual", "Plain"];
    const toOrFrom = fromTones.includes(tone) ? "from" : "to";
    return `Translate ${toOrFrom} ${tone}`;
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
          {tone === "Casual" && "💬"}
          {tone === "Formal" && "🧑‍💼"}
          {tone === "Plain" && "📘"}
        </span>
        {tone}
      </div>
    ))}
  </div>
</aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow sm:ml-48 w-full bg-[#111] px-6 pt-20">
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
        {descriptionVisible && selectedTone && (
          <div className="max-w-2xl w-full mx-auto mb-4 mt-4">
            <div className="p-3 bg-gray-800 text-sm text-gray-300 rounded">
              {toneDescriptions[selectedTone]}
            </div>
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
