'use client';

import Link from "next/link";
import { LayoutDashboard, Compass, ShoppingBag, User } from "lucide-react";
import PixelEarth from "./components/PixelEarth";


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


export default function Home() {
  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative flex items-center justify-center">
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
