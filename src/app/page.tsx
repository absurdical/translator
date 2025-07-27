"use client";

import { useState } from "react";

const toneOptions = ["Boomer", "BS", "Gary Vee"];

export default function HomePage() {
  const [selectedTone, setSelectedTone] = useState("Boomer");

  const getButtonLabel = (tone: string) => {
    if (!tone) return "Translate";

    const fromTones = ["BS", "Boomer"];
    const toOrFrom = fromTones.includes(tone) ? "from" : "to";

    return `Translate ${toOrFrom} ${tone}`;
  }

  return (
    <main className="min-h-screen flex px-4">
      {/* Sidebar */}
      <aside className="w-48 pt-20 pr-6 fixed space-y-3 text-sm font-mono">
        {toneOptions.map((tone) => (
          <div
            key={tone}
            onClick={() => setSelectedTone(tone)}
            className={`cursor-pointer flex items-center gap-2 ${
              selectedTone === tone
                ? "text-pink-500 font-semibold"
                : "text-gray-400 hover:text-pink-400"
            }`}
          >
            <span>{selectedTone === tone ? ">" : "·"}</span>
            {tone}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow ml-48 w-full bg-[#111] px-4">
        <div className="flex-grow" />
        <div className="max-w-2xl w-full mx-auto space-y-4">
          <textarea
            placeholder="Paste text here..."
            className="w-full p-3 border border-gray-700 rounded-md resize-none min-h-[100px] bg-black text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition">
            {getButtonLabel(selectedTone)}
          </button>
        </div>
      </div>
    </main>
  );
}
