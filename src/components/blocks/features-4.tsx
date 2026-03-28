import { Cpu, Fingerprint, User, Zap } from "lucide-react";

export function Features() {
  return (
    <section id="why-us" className="relative py-20 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-8">
          <h2 className="text-balance text-4xl font-medium text-white lg:text-5xl">
            Why work with Apex Code
          </h2>
          <p className="text-gray-400">
            Two founders. No account managers. You work directly with the people
            building your product.
          </p>
        </div>

        {/* Top row — 3 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-5xl">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-white/20 transition-colors duration-300">
            <Zap strokeWidth={1} className="w-16 h-16 text-white/50" />
            <h3 className="text-white font-semibold text-lg">Fast Delivery</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We scope tightly and ship in weeks, not quarters. You see working
              software early and often.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-white/20 transition-colors duration-300">
            <Cpu strokeWidth={1} className="w-16 h-16 text-white/50" />
            <h3 className="text-white font-semibold text-lg">Modern Stack</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI APIs, TypeScript, cloud-native infrastructure. Your solution
              won't age out.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-white/20 transition-colors duration-300">
            <Fingerprint strokeWidth={1} className="w-16 h-16 text-white/50" />
            <h3 className="text-white font-semibold text-lg">Human Touch</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Direct access to the founders. No tickets, no handoffs, no delays.
            </p>
          </div>
        </div>

        {/* Bottom row — 2 founder cards centered */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-white/20 transition-colors duration-300 max-w-sm flex-1">
            <User strokeWidth={1} className="w-16 h-16 text-white/50" />
            <h3 className="text-white font-semibold text-lg">Vlad Vulcu</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-stack developer with deep experience in AI integration and
              backend systems.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-white/20 transition-colors duration-300 max-w-sm flex-1">
            <User strokeWidth={1} className="w-16 h-16 text-white/50" />
            <h3 className="text-white font-semibold text-lg">Mihnea Mihai</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Product-minded engineer bridging the gap between what clients need
              and what gets built.
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-[#111111]" />
    </section>
  );
}
