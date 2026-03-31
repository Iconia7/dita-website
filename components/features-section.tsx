import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturesSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6 space-y-24">
        {/* Feature 1 — For Students */}
        <div className="flex flex-col gap-16 items-center lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 aspect-[4/3]">
              <img
                src="https://placehold.co/800x600/e2e8f0/94a3b8?text=Students"
                alt="For Students"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-xs tracking-widest uppercase font-semibold text-slate-500">
              For Students
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-[1.2]">
              Accelerate your tech career while on campus.
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              Join a community of passionate developers and designers. We bridge
              the gap between classroom theory and industry reality.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Access exclusive coding bootcamps (Flutter, React, Python).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Get paired with senior student mentors for project guidance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Participate in hackathons with real-world prizes.
                </span>
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              <Link href="/services">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature 2 — For Partners & Sponsors */}
        <div className="flex flex-col gap-16 items-center lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 aspect-[4/3]">
              <img
                src="https://placehold.co/800x600/e2e8f0/94a3b8?text=Partners"
                alt="For Partners & Sponsors"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-xs tracking-widest uppercase font-semibold text-slate-500">
              For Partners & Sponsors
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-[1.2]">
              Connect with the next generation of tech talent.
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              We partner with top tech companies to provide students with
              internships, talks, and exposure.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Host workshops and tech talks at Daystar University.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Recruit top talent directly from our project showcases.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-slate-400" />
                <span className="text-slate-600 text-base leading-relaxed">
                  Sponsor hackathons and brand your company on campus.
                </span>
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              <Link href="/contact">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
