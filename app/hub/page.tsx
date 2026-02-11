'use client';

import Link from "next/link";
import { LayoutDashboard, Compass, ShoppingBag, User, MapPin, Navigation } from "lucide-react";
import PixelEarth from "../components/PixelEarth";
import HackClubLogo from "../components/Icons";


const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, position: "top" as const },
  { label: "Explore", icon: Compass, position: "right" as const },
  { label: "Shop", icon: ShoppingBag, position: "bottom" as const },
  { label: "Profile", icon: User, position: "left" as const },
];

const positionClasses: Record<string, string> = {
  top: "-translate-x-full -translate-y-full left-1/2 top-[calc(50%-180px)]",
  bottom: "-translate-x-full translate-y-full left-1/2 bottom-[calc(50%-180px)]",
  left: "-translate-x-full -translate-y-full top-1/2 left-[calc(50%-180px)]",
  right: "translate-x-full -translate-y-full top-1/2 right-[calc(50%-180px)]",
};

const animClass: Record<string, string> = {
  top: "animate-float",
  bottom: "animate-float-reverse",
  left: "animate-float-reverse",
  right: "animate-float",
};

const FloatingElement = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className={`absolute pointer-events-none opacity-20 ${className}`} style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
);

export default function Hub() {
  return (
      

    <div className="h-screen w-screen bg-background overflow-hidden relative flex items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 z-10 flex items-center justify-between px-6 py-4 w-full border-b border-border bg-background/70 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <HackClubLogo className="h-8 w-auto text-primary" />
          <span className="font-pixel text-[10px] text-muted-foreground hidden sm:inline">× TRACK IT</span>
        </div>
      </header>


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

      {/* Floating nav buttons */}
      {NAV_ITEMS.map(({ label, icon: Icon, position }) => (
        <Link
          key={label}
          href="#"
          className={`absolute ${positionClasses[position]} ${animClass[position]}`}
          style={{
            animationDelay:
              position === "right" || position === "left" ? "1s" : "0s",
          }}
        >
          <div className="flex flex-col items-center gap-2 px-5 py-4 transition-all duration-200 hover:scale-110 animate-pulse-glow cursor-pointer">
            <Icon size={28} className="text-primary" />
            <span className="font-pixel text-[10px] text-foreground">{label}</span>
          </div>
        </Link>
      ))}

      {/* Centered Earth */}
      <div className="w-[360px] h-[360px] relative">
        <PixelEarth centered/>
      </div>
    </div>
  );
}
