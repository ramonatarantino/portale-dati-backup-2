import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, RotateCcw } from "lucide-react";


type FlashCardColor =
  | "blue"
  | "blue-dark"
  | "blue-light"
  | "gold"
  | "gold-dark"
  | "gold-light"
  | "white";


interface FlashCardProps {
  number: string;
  question: string;
  answer: string;
  color: FlashCardColor;
  className?: string;
}

const colorClasses: Record<
  FlashCardColor,
  {
    border: string;
    accent: string;
    bg: string;
    glow: string;
    hoverGlow: string;
  }
> = {
  /* 🔵 BLU STANDARD */
  blue: {
    border: "border-l-4 border-l-[#1E55A5]",
    accent: "text-[#1E55A5]",
    bg: "bg-gradient-to-br from-[#D7D9DF] to-white",
    glow: "shadow-[0_0_20px_rgba(30,85,165,0.15)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(74,128,216,0.3)]",
  },

  /* 🔵 BLU SCURO */
  "blue-dark": {
    border: "border-l-4 border-l-[#082B6F]",
    accent: "text-[#082B6F]",
    bg: "bg-gradient-to-br from-[#C1C3C8] to-white",
    glow: "shadow-[0_0_20px_rgba(8,43,111,0.25)]",
    hoverGlow: "hover:shadow-[0_0_32px_rgba(18,60,136,0.4)]",
  },

  /* 🔵 BLU CHIARO */
  "blue-light": {
    border: "border-l-4 border-l-[#4A80D8]",
    accent: "text-[#2F69BC]",
    bg: "bg-gradient-to-br from-[#D7D9DF] to-white",
    glow: "shadow-[0_0_20px_rgba(74,128,216,0.2)]",
    hoverGlow: "hover:shadow-[0_0_32px_rgba(74,128,216,0.35)]",
  },

  /* 🟡 ORO STANDARD */
  gold: {
    border: "border-l-4 border-l-[#D4AA1F]",
    accent: "text-[#D4AA1F]",
    bg: "bg-gradient-to-br from-[#D4AA1F] to-white",
    glow: "shadow-[0_0_20px_rgba(217,204,167,0.35)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(217,204,167,0.5)]",
  },

  /* 🟡 ORO SCURO */
  "gold-dark": {
    border: "border-l-4 border-l-[#E1B823]",
    accent: "text-[#E1B823]",
    bg: "bg-gradient-to-br from-[#E1B823] to-white",
    glow: "shadow-[0_0_20px_rgba(193,195,200,0.45)]",
    hoverGlow: "hover:shadow-[0_0_32px_rgba(193,195,200,0.6)]",
  },

  /* 🟡 ORO CHIARO */
  "gold-light": {
    border: "border-l-4 border-l-[#D9CCA7]",
    accent: "text-[#D9CCA7]",
    bg: "bg-gradient-to-br from-[#D9CCA7]/70 to-white",
    glow: "shadow-[0_0_20px_rgba(227,217,188,0.4)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(227,217,188,0.6)]",
  },

  /* ⚪ NEUTRO */
  white: {
    border: "border-l-4 border-l-[#C1C3C8]",
    accent: "text-[#1E55A5]",
    bg: "bg-gradient-to-br from-[#CCCED3] to-white",
    glow: "shadow-[0_0_20px_rgba(215,217,223,0.5)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(215,217,223,0.7)]",
  },
};


const FlashCard = ({ number, question, answer, color, className }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("cursor-pointer group", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-[200px] transition-all duration-500 ease-in-out rounded-2xl",
          "shadow-lg hover:shadow-2xl border border-gray-200 transform hover:scale-105",
          colorClasses[color].bg,
          colorClasses[color].border,
          colorClasses[color].glow,
          colorClasses[color].hoverGlow
        )}
      >
        {/* Front - Question */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl flex flex-col p-4",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100",
            "transition-opacity duration-500 ease-in-out",
            "bg-gradient-to-br from-white to-gray-50"
          )}
        >
          <div className="flex justify-end mb-6">
            <Sparkles className={cn("w-6 h-6 animate-pulse", colorClasses[color].accent)} />
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">
              {question}
            </h3>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Tocca per vedere la risposta
            </div>
          </div>
        </div>

        {/* Back - Answer */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl flex flex-col p-6",
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none",
            "transition-opacity duration-500 ease-in-out",
            "bg-gradient-to-br from-white to-gray-50"
          )}
        >
          <div className="flex justify-center mb-4">
            <span className={cn("text-4xl font-bold", colorClasses[color].accent)}>
              {number}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-base text-gray-700 leading-relaxed font-medium">
              {answer}
            </p>
          </div>
          
          <div className="text-xs text-gray-400 mt-4 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Tocca per tornare alla domanda
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;