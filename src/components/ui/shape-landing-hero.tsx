import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionButton } from "@/components/ui/motion-button";

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  floatDuration?: number;
  floatDelay?: number;
  floatAmplitude?: number;
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  floatDuration = 7,
  floatDelay = 0,
  floatAmplitude = 18,
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, -floatAmplitude, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{ width, height }}
        className={cn(
          "rounded-full",
          "bg-gradient-to-r to-transparent",
          gradient,
          "backdrop-blur-[2px] border-2 border-white/[0.15]",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
          "after:absolute after:inset-0 after:rounded-full",
          "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
        )}
      />
    </motion.div>
  );
}

interface HeroGeometricProps {
  badge?: string;
  title1?: string;
  title2?: string;
}

export function HeroGeometric({
  badge = "AI-Powered Studio",
  title1 = "We Build AI-Powered",
  title2 = "Software That Ships",
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={-15}
          gradient="from-indigo-500/[0.15]"
          className="-top-20 -left-32"
          floatDuration={7}
          floatDelay={0}
          floatAmplitude={18}
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={15}
          gradient="from-rose-500/[0.15]"
          className="-top-10 -right-24 md:right-0"
          floatDuration={8}
          floatDelay={2}
          floatAmplitude={14}
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="top-1/3 -left-16"
          floatDuration={6}
          floatDelay={4}
          floatAmplitude={16}
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="top-1/4 right-10 md:right-32"
          floatDuration={7.5}
          floatDelay={1}
          floatAmplitude={12}
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="bottom-1/4 left-20 md:left-48"
          floatDuration={6.5}
          floatDelay={3}
          floatAmplitude={15}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-16 text-center">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.15] bg-white/[0.03] mb-8"
        >
          <Circle className="h-2 w-2 fill-indigo-400 text-indigo-400" />
          <span className="text-xs font-medium text-white/60 tracking-widest uppercase">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          style={{ lineHeight: 1.05 }}
        >
          <span className="text-white">{title1}</span>
          <br />
          <span
            className="bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-transparent"
          >
            {title2}
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Apex Code is a two-person studio that ships AI automation, custom
          tools, and smart integrations — built to fit your business, not the
          other way around.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionButton label="Work With Us" href="#contact" />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-[#111111] pointer-events-none z-10" />
    </div>
  );
}
