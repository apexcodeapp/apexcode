"use client";
import type { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

const Component: FC<ComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer">
      <Card className="text-white rounded-2xl border border-white/10 bg-linear-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-white/25 w-87.5">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30"></div>
        </div>
        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="p-6 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl">
              {icon}
            </div>
          </div>
          <h3 className="mb-4 text-3xl font-bold text-white">
            {title}
          </h3>
          <div className="space-y-1 max-w-sm">
            {description.map((line, idx) => (
              <p key={idx} className="text-gray-300 text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
        </div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default Component;
