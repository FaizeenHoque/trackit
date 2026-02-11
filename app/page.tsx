'use client';
import { useEffect, useRef, useState } from "react";
import HackClubLogo from "./components/Icons";
import PixelEarth from "./components/PixelEarth";

import { FilloutPopupEmbed } from "@fillout/react";
import { site } from "@/config/site";
import { Compass, Gamepad2, Map, MapPin, Navigation, Radio } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { faqs } from "@/config/faq";

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
        <a href="/hub" className="font-pixel text-xs bg-primary text-primary-foreground px-4 py-2 border-2 border-primary hover:bg-primary/80 transition-colors animate-pulse-glow hover:scale-105 transition-transform">
          Login with HackClub
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-44">
        <h1 className="font-pixel text-4xl sm:text-5xl md:text-7xl text-foreground mb-6 tracking-wider drop-shadow-sm">
          TRACK IT
        </h1>
        <p className="font-pixel-body text-2xl sm:text-3xl text-muted-foreground max-w-2xl mb-4">
          You ship, we ship.
        </p>
        <p className="font-pixel-body text-lg sm:text-xl text-muted-foreground max-w-xl mb-10">
          Build a map app, GeoGuessr-style game, or DIY GPS tracker — and win prizes from Hack Club.
        </p>
        <a
          id="LOG IN"
          className="font-pixel text-sm sm:text-base bg-primary text-primary-foreground px-8 py-4 border-4 border-primary animate-pulse-glow hover:scale-105 transition-transform"
          href="/hub"
        >
          Login with HackClub
        </a>
      </section>

      {/* Intro */}
      <FadeInSection>
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <h2 className="font-pixel text-lg sm:text-xl text-foreground text-center mb-4">WHAT YOU CAN BUILD</h2>
          <p className="font-pixel-body text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Pick a track that excites you — or invent your own geography-powered project. Ship it, share it, and we'll ship you something back.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <TrackCard icon={Map} title="MAP APP" desc="Interactive maps, custom layers, or location-based tools." />
            <TrackCard icon={Gamepad2} title="GEO GAME" desc="GeoGuessr-style challenges, quizzes, or exploration games." />
            <TrackCard icon={Radio} title="GPS TRACKER" desc="DIY hardware or software that tracks real-world movement." />
          </div>
        </section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection>
        <section className="relative z-10 max-w-2xl mx-auto px-6 py-20">
          <h2 className="font-pixel text-lg sm:text-xl text-foreground text-center mb-10">FAQ</h2>
          <Accordion typeof="single" className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                title={f.q}
                className="border-2 border-border bg-card/90 backdrop-blur-sm px-4 hover:border-primary transition-colors"
              >
                <div className="font-pixel-body text-lg text-muted-foreground pb-5">
                  {f.a}
                </div>
              </AccordionItem>
            ))}
          </Accordion>

        </section>
      </FadeInSection>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/70 backdrop-blur-sm py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <HackClubLogo className="h-10 w-auto text-foreground" />

          <p className="font-pixel-body text-sm text-muted-foreground text-center">
            © 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
          </p>
        </div>
      </footer>

    </div>
  );
}