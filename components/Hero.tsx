import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://media.istockphoto.com/id/1755727979/photo/mature-man-in-a-cycling-class-at-the-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=KvELyE0tTejN1ZuYq61j6srld0z_ox_A_M8yjLTyrDo=" 
          alt="Person working on laptop" 
          className="object-cover w-full h-full opacity-90"
        />
        {/* Dark Gradient Overlay to match the mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        
        {/* Powered By Badge */}
        <div className="mb-6 group">
          <a href="#" className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white/90 transition-all bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20">
            Powered by Toloka
            <ArrowUpRight size={12} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl mb-6 text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-[64px] leading-[1.1]">
          Share what you know,<br className="hidden md:block" /> shape what's next
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl mb-10 text-base leading-relaxed text-white/90 md:text-lg">
          Help teach AI how professionals think — <br className="hidden sm:block" />
          from clinical decisions to creative insights
        </p>

        {/* CTA Button */}
        <div className="mb-20">
             <Button className="px-8 py-3 text-base !bg-mindrift-green !hover:bg-mindrift-greenHover shadow-[0_0_20px_rgba(184,243,137,0.4)]">
                Apply now
             </Button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
            <ArrowDown className="text-white/80" size={24} />
        </div>

      </div>
    </div>
  );
};