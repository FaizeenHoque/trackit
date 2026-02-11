import HackClubLogo from "./components/Icons";
import PixelEarth from "./components/PixelEarth";

export default function Home() {
  return (
    <div>
      {/* Background */}
      <PixelEarth />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/70 backdrop-blur-sm py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <HackClubLogo className="h-10 w-auto text-foreground" />
          <a href="#rsvp" className="font-pixel text-xs bg-primary text-primary-foreground px-6 py-3 border-2 border-primary hover:bg-primary/80 transition-colors">
            RSVP NOW
          </a>
          <p className="font-pixel-body text-sm text-muted-foreground text-center">
            © 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
          </p>
        </div>
      </footer>
    </div>
  );
}
