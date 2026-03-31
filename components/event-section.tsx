import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";

const events = [
  {
    id: 1,
    title: "Annual Hackathon 2025",
    date: "August 15, 2025",
    time: "8:00 AM – 8:00 PM",
    location: "Daystar University, Athi River",
    category: "Hackathon",
    image: "https://placehold.co/800x400/e2e8f0/94a3b8?text=Hackathon",
  },
  {
    id: 2,
    title: "Flutter Bootcamp",
    date: "September 3, 2025",
    time: "9:00 AM – 1:00 PM",
    location: "ICT Lab, Block C",
    category: "Workshop",
    image: "https://placehold.co/800x400/e2e8f0/94a3b8?text=Flutter",
  },
  {
    id: 3,
    title: "Tech Talk: AI in Africa",
    date: "September 20, 2025",
    time: "2:00 PM – 4:00 PM",
    location: "Auditorium, Main Campus",
    category: "Talk",
    image: "https://placehold.co/800x400/e2e8f0/94a3b8?text=AI+Talk",
  },
];

export default function EventsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-slate-500 mb-2">
              Action & Adventure
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Upcoming Activities
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-slate-500 hover:text-slate-900"
          >
            <Link href="/events">
              View full calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
