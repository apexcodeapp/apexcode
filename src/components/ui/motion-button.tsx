import { type FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  label: string;
  classes?: string;
  href?: string;
}

export const MotionButton: FC<Props> = ({ label, classes, href }) => {
  const inner = (
    <button
      className={cn(
        'group relative h-auto w-50 cursor-pointer rounded-full border border-white/20 bg-transparent p-1 outline-none',
        classes ?? ''
      )}
      type="button"
    >
      {/* Expanding fill circle — white, grows left-to-right on hover */}
      <span
        className="circle m-0 block h-12 w-12 overflow-hidden rounded-full bg-white duration-500 group-hover:w-full"
        aria-hidden="true"
      />
      {/* Arrow — always over the white circle, so always dark */}
      <div className="icon absolute top-1/2 left-4 -translate-y-1/2 duration-500 group-hover:translate-x-[0.4rem]">
        <ArrowRight className="size-6 text-[#030303]" />
      </div>
      {/* Text — white at rest (on transparent/dark bg), dark when circle covers it */}
      <span className="button-text absolute top-2/4 left-2/4 ml-4 -translate-x-2/4 -translate-y-2/4 whitespace-nowrap text-center text-lg font-medium tracking-tight text-white duration-500 group-hover:text-[#030303]">
        {label}
      </span>
    </button>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }

  return inner;
};
