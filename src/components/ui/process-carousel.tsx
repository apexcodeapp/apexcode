import { Search, Hammer, Rocket } from "lucide-react";
import Component from "@/components/ui/highlight-card";

const cards = [
  {
    title: "Discover",
    icon: <Search className="w-8 h-8 text-white" />,
    description: [
      "We learn your workflow,",
      "pain points, and goals",
      "in a focused session —",
      "no lengthy discovery phase.",
    ],
  },
  {
    title: "Build",
    icon: <Hammer className="w-8 h-8 text-white" />,
    description: [
      "We ship working increments",
      "on a short cycle so you",
      "see progress and give feedback",
      "before anything is locked in.",
    ],
  },
  {
    title: "Ship",
    icon: <Rocket className="w-8 h-8 text-white" />,
    description: [
      "We deploy, document,",
      "and hand off — then stay",
      "available when something",
      "needs adjusting after launch.",
    ],
  },
];

export function ProcessCarousel() {
  return (
    <div className="relative overflow-hidden">
      {/* Left fade mask */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-[#0a0a0a] to-transparent" />
      {/* Right fade mask */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-[#0a0a0a] to-transparent" />

      <div className="carousel-track">
        {[...cards, ...cards, ...cards, ...cards].map((card, idx) => (
          <Component
            key={idx}
            title={card.title}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
