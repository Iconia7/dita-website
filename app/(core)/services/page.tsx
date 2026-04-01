import Link from "next/link";
import {
  Code,
  Laptop,
  Users,
  Briefcase,
  GraduationCap,
  Wifi,
  ArrowRight,
  Zap,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ServiceCard } from "@/components/service-card";

export const metadata = {
  title: "Our Services - Daystar Information Technology Association",
  description:
    "Explore DITA's student programs: Coding Bootcamps, Peer Mentorship, Hackathons, and Career Development workshops designed to make you job-ready.",
};

const services = [
  {
    icon: Code,
    title: "Coding Bootcamps",
    description:
      "Intensive weekly sessions on Web Development, Mobile Apps (Flutter), and Data Science to get you job-ready.",
  },
  {
    icon: Users,
    title: "Peer Mentorship",
    description:
      "First-year students are paired with seniors to guide them through academic challenges and project work.",
  },
  {
    icon: Laptop,
    title: "Hackathons",
    description:
      "Competitions that challenge you to solve real-world problems under time constraints, with exciting prizes.",
  },
  {
    icon: Briefcase,
    title: "Career Development",
    description:
      "CV writing workshops, portfolio reviews, and mock interviews tailored for the tech industry.",
  },
  {
    icon: GraduationCap,
    title: "Academic Support",
    description:
      "Exam revision groups and tutoring for difficult units like Data Structures and Algorithms.",
  },
  {
    icon: Wifi,
    title: "Tech Talks",
    description:
      "Guest speakers from companies like Microsoft, Google, and Safaricom sharing industry insights.",
  },
];

const stats = [
  {
    icon: Zap,
    value: "50+",
    label: "Workshops Held",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Users,
    value: "300+",
    label: "Active Members",
    color: "text-sky-500 bg-sky-50",
  },
  {
    icon: Trophy,
    value: "12",
    label: "Hackathon Wins",
    color: "text-purple-500 bg-purple-50",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-sky-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
            alt="Services Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-linear-to-br from-sky-600/80 via-cyan-500/60 to-sky-400/40" />

        <div className="container mx-auto px-6 relative z-10 text-center space-y-6 mb-40 pt-16">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-white/70 border-white/20 bg-white/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse mr-2" />
              What We Do
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Empowering Your <br />
            <span className="text-white/90">Tech Journey.</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From writing your first line of code to landing your first job, DITA
            is here to support every step of your career.
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

      {/* ── STATS STRIP ── */}
      <section className="relative z-20 mt-5 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {stats.map(({ icon: Icon, value, label, color }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center p-4 gap-3"
                  >
                    <div className={`p-3 rounded-full ${color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-3xl font-bold text-foreground">
                      {value}
                    </h4>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground shrink-0">
              Core Programs
            </h2>
            <Separator />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-sky-500 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white space-y-2">
            <h2 className="text-3xl font-bold">Have a project idea?</h2>
            <p className="text-white/70">
              Join our next hackathon and bring it to life.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-white text-slate-900 hover:bg-white/90 font-semibold shrink-0"
          >
            <Link href="/events">
              View Calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
