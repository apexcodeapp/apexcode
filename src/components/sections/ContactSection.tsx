import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-40 bg-[#0a0a0a]">
<div className="mx-auto max-w-3xl px-6 text-center">

        {/* Eyebrow */}
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-6">
          Let's Work Together
        </p>

        {/* Headline */}
        <h2 className="text-white text-5xl font-bold tracking-tight mb-6">
          Ready to build something<br />that actually works?
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          No agencies. No account managers. Just two developers
          who will take your idea and ship it.
        </p>

        {/* Two buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary */}
          <a
            href="mailto:hello@apexcodeapp.com"
            className="flex items-center gap-3 bg-white text-black rounded-full px-8 py-4 font-semibold text-sm hover:bg-gray-100 transition-colors duration-200 group w-full sm:w-auto justify-center"
          >
            Send Us a Message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          {/* Secondary */}
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-white/20 text-white rounded-full px-8 py-4 font-semibold text-sm hover:border-white/40 transition-colors duration-200 group w-full sm:w-auto justify-center"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

        </div>
      </div>
    </section>
  );
}
