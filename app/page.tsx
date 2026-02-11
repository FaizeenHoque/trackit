'use client';

import PixelEarth from "./components/PixelEarth";



export default function Home() {
  return (
    <div>
      {/* Centered Earth */}
      <div className="h-screen w-screen bg-background overflow-hidden relative flex items-center justify-center">
        <PixelEarth />
      </div>

    </div>
  );
}
