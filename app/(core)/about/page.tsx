import Link from "next/link";
import { Target, Lightbulb, Heart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "About Us - Daystar Information Technology Association",
  description:
    "Discover the story behind DITA. Learn about our mission to foster innovation, our values, and how we are bridging the gap between academia and the tech industry at Daystar University.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-sky-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
            alt="DITA Team"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-600/80 via-cyan-500/60 to-sky-400/40" />

        <div className="container mx-auto px-6 relative z-10 text-center space-y-6 mb-40">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-white/70 border-white/20 bg-white/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse mr-2" />
              Our Story
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            More Than Just <br />
            <span className="text-white/90">Lines of Code.</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We are fostering a culture of innovation, excellence, and
            technological leadership at Daystar University.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-16 fill-background"
          >
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES CARDS ── */}
      <section className="relative z-20 mt-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Mission */}
            <Card className="border-t-4 border-t-sky-500 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To equip students with practical technical skills, bridge the
                  gap between academia and industry, and create a supportive
                  community for peer learning.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-t-4 border-t-cyan-400 bg-slate-900 text-white hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-400">
                  <Lightbulb size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
                <p className="text-slate-400 leading-relaxed">
                  To be the leading student-run technology association in the
                  region, producing world-class developers, designers, and tech
                  leaders.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-t-4 border-t-sky-500 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Our Values
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Innovation, Collaboration, Integrity, and Excellence. We
                  believe in lifting others as we climb and sharing knowledge
                  freely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-2">
                  Since 2024
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-foreground">
                  From a Study Group to a Movement.
                </h2>
                <Separator className="mt-4 w-16 bg-sky-500 h-1 rounded-full" />
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded to address the need for practical skills in the IT
                curriculum, DITA has grown from a small study group into a
                campus-wide movement. We organize hackathons, industry visits,
                and weekly coding sessions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you are a complete beginner or a seasoned pro, there is
                a place for you here. We are built by students, for students.
              </p>

              <Button
                asChild
                variant="ghost"
                className="px-0 text-sky-600 hover:text-sky-700 hover:bg-transparent font-semibold"
              >
                <Link href="/contact">
                  Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
