'use client';
import { useEffect, useRef, useState } from "react";
import HackClubLogo from "./components/Icons";
import PixelEarth from "./components/PixelEarth";

import { FilloutPopupEmbed } from "@fillout/react";
import { site } from "@/config/site";
import { Compass, MapPin, Navigation } from "lucide-react";

const FloatingElement = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className={`absolute pointer-events-none opacity-20 ${className}`} style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
);
const FadeInSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};
const TrackCard = ({ icon: Icon, title, desc }: { icon: typeof MapPin; title: string; desc: string }) => (
  <div className="border-2 border-border bg-card/90 backdrop-blur-sm p-6 hover:border-primary hover:bg-muted/90 transition-colors group">
    <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
    <h3 className="font-pixel text-sm text-foreground mb-2">{title}</h3>
    <p className="font-pixel-body text-lg text-muted-foreground leading-snug">{desc}</p>
  </div>
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Background */}
      <PixelEarth />

      {/* Floating decorations */}
      <FloatingElement className="top-[12%] left-[8%] animate-float" delay={0}>
        <MapPin className="w-8 h-8 text-primary" />
      </FloatingElement>
      <FloatingElement className="top-[20%] right-[12%] animate-float-reverse" delay={1.2}>
        <Compass className="w-10 h-10 text-accent" />
      </FloatingElement>
      <FloatingElement className="top-[55%] left-[5%] animate-float" delay={0.6}>
        <Navigation className="w-6 h-6 text-secondary" />
      </FloatingElement>
      <FloatingElement className="top-[70%] right-[8%] animate-float-reverse" delay={1.8}>
        <MapPin className="w-7 h-7 text-primary" />
      </FloatingElement>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/70 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <HackClubLogo className="h-8 w-auto text-primary" />
          <span className="font-pixel text-[10px] text-muted-foreground hidden sm:inline">× TRACK IT</span>
        </div>
        <a href="#rsvp" className="font-pixel text-xs bg-primary text-primary-foreground px-4 py-2 border-2 border-primary hover:bg-primary/80 transition-colors">
          RSVP
        </a>
      </header>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/70 backdrop-blur-sm py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <HackClubLogo className="h-10 w-auto text-foreground" />
          <a
            href="#rsvp"
            className="font-pixel text-xs bg-primary text-primary-foreground px-6 py-3 border-2 border-primary hover:bg-primary/80 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            RSVP NOW
          </a>

          <p className="font-pixel-body text-sm text-muted-foreground text-center">
            © 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
          </p>
        </div>
      </footer>

      {/* Fillout Form */}
      <FilloutPopupEmbed
        filloutId={site.rsvpform}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
