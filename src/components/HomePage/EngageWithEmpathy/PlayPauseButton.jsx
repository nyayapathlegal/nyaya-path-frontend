"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

export const PlayPauseButton = ({ ref }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!ref.current) return;

    if (isPlaying) {
      ref.current.pause();
    } else {
      ref.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="absolute z-20 top-6 right-6 flex items-center gap-2 bg-[#5a5a5a] backdrop-blur px-4 py-2 rounded-full border border-white/10 text-md transition-all pointer-events-auto"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 opacity-40" />
      ) : (
        <Play className="w-5 h-5 opacity-40" />
      )}
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};
