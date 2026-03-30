import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sky-800">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
          alt="DITA Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-sky-600/80 via-cyan-500/60 to-sky-400/40" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 z-1 bg-linear-to-t from-sky-800 via-sky-800/90 to-transparent" />

      {/* Decorative blurred circles */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-4 text-xs tracking-widest uppercase font-semibold text-black border-white/30 bg-white/10 backdrop-blur-sm"
            >
              Daystar Information Technology Association
            </Badge>
          </div>

          {/* Headline - Transform should be white not dark */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Innovate. <span className="text-black/90">Transform.</span> Lead.
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            Join the premier community for tech enthusiasts, developers, and
            visionaries at Daystar University.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              <Link href="/contact">Become a Member</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base font-medium border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Link href="/events">
                View Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-16 md:h-20 fill-background"
        >
          <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
