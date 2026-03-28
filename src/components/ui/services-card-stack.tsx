import { CardStack } from "@/components/ui/card-stack";

const items = [
  {
    id: 1,
    title: "AI Automation",
    description: "Systems that run while you sleep",
    imageSrc: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: 2,
    title: "Custom Development",
    description: "Built to fit your business exactly",
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    id: 3,
    title: "Smart Integrations",
    description: "Your tools talking to each other",
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: 4,
    title: "Rapid Delivery",
    description: "From idea to production fast",
    imageSrc: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  },
  {
    id: 5,
    title: "Bulletproof Architecture",
    description: "Built to scale from day one",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

export function ServicesCardStack() {
  return (
    <div style={{ overflow: "visible", position: "relative", width: "100%" }}>
      <CardStack
        items={items}
        initialIndex={2}
        autoAdvance
        intervalMs={2500}
        pauseOnHover
        showDots
        cardWidth={520}
        cardHeight={300}
        overlap={0.55}
        spreadDeg={40}
        perspectivePx={900}
        depthPx={180}
        tiltXDeg={10}
        activeLiftPx={30}
        activeScale={1.06}
        inactiveScale={0.82}
        springStiffness={240}
        springDamping={40}
        maxVisible={5}
        loop={true}
      />
    </div>
  );
}
