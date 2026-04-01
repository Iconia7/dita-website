import { Users, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExecutiveCard } from "@/components/executive-card";

export const metadata = {
  title: "Leadership & Team - Daystar Information Technology Association",
  description:
    "Meet the dedicated team behind DITA. Get to know the University Patrons, the Dean, and the Student Executive Council driving technological excellence on campus.",
};

// Replace with real data / API fetch later
const universityLeadership = [
  {
    id: 1,
    name: "Dr. Jane Muthoni",
    role: "Faculty Patron",
    bio: "Senior lecturer in Computer Science with over 15 years of experience bridging academia and industry.",
    image: "https://placehold.co/200x200/e2e8f0/94a3b8?text=JM",
  },
  {
    id: 2,
    name: "Prof. David Omondi",
    role: "Dean, School of Science",
    bio: "Champion of student innovation and technology entrepreneurship across East Africa.",
    image: "https://placehold.co/200x200/e2e8f0/94a3b8?text=DO",
  },
];

const studentExecutives = [
  {
    id: 1,
    name: "Alice Wanjiku",
    role: "President",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=AW",
    linkedin: "#",
    github: "#",
  },
  {
    id: 2,
    name: "Brian Kipchoge",
    role: "Vice President",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=BK",
    linkedin: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Carol Akinyi",
    role: "Secretary General",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=CA",
    linkedin: "#",
    github: "#",
  },
  {
    id: 4,
    name: "Daniel Mutua",
    role: "Treasurer",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=DM",
    linkedin: "#",
    github: "#",
  },
  {
    id: 5,
    name: "Esther Njeri",
    role: "Events Coordinator",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=EN",
    linkedin: "#",
    github: "#",
  },
  {
    id: 6,
    name: "Felix Ochieng",
    role: "Tech Lead",
    image: "https://placehold.co/400x500/e2e8f0/94a3b8?text=FO",
    linkedin: "#",
    github: "#",
  },
];

export default function LeadershipPage() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-sky-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            alt="Leadership Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-600/80 via-cyan-500/60 to-sky-400/40" />

        <div className="container mx-auto px-6 relative z-10 text-center space-y-6 mb-40 pt-16">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-white/70 border-white/20 bg-white/5 backdrop-blur-sm"
            >
              <Users className="w-3 h-3 mr-2" />
              The Team
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Leading with <br />
            <span className="text-white/90">Vision & Purpose.</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated faculty mentors and student leaders driving
            innovation at Daystar University.
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

      {/* ── UNIVERSITY LEADERSHIP ── */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground flex items-center justify-center gap-2">
              <Award className="w-4 h-4" /> Mentorship
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              University Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {universityLeadership.map((leader) => (
              <Card
                key={leader.id}
                className="flex flex-col sm:flex-row items-center gap-6 p-8 hover:-translate-y-1 transition-transform duration-300 group"
              >
                <div className="relative shrink-0">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white p-1.5 rounded-full">
                    <Star className="w-3.5 h-3.5" fill="currentColor" />
                  </div>
                </div>

                <CardContent className="p-0 text-center sm:text-left space-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-600">
                    {leader.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT EXECUTIVES ── */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
              Governance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Executive Council
            </h2>
            <Separator className="w-16 bg-sky-500 h-1 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentExecutives.map((exec) => (
              <ExecutiveCard key={exec.id} {...exec} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
