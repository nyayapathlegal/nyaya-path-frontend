import { CircularButton } from "@/components/Layouts";
import { Lightbulb } from "lucide-react";
import React from "react";

const NamePagaBtn = () => {
  return (
    <div className="text-white space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb size={30} color="#bfe1ff" />
        <h1 className="text-[32px] font-semibold tracking-tight bg-gradient-to-r from-[#d9ffb1] via-[#d2fff5] to-[#ddefff] bg-clip-text text-transparent">
          Smart Insights
        </h1>
      </div>

      <p className="text-white/70 text-[18px] leading-7 max-w-md">
        The fastest way to build, govern,
        <br />
        and scale enterprise AI agents.
      </p>

      <CircularButton text="Explore Agent Canvas" />
    </div>
  );
};

export default NamePagaBtn;
