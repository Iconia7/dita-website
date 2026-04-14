import { Smartphone } from "lucide-react";

export default function AppCTA() {
  return (
    <div className="relative z-10 container mx-auto px-6 -mb-16">
      <div className="rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
            <Smartphone size={16} />
            <span>Official Mobile App</span>
          </div>
          <h3 className="text-3xl font-bold text-white">
            Get your Digital ID.
          </h3>
          <p className="text-white/80 text-sm max-w-md leading-relaxed">
            Download the DITA app to register as a member, access your digital
            membership card, and get notified about upcoming hackathons.
          </p>
        </div>

        {/* Google Play Badge */}
        <a
          href="#"
          className="shrink-0 flex items-center gap-3 bg-slate-900 text-white rounded-xl px-5 py-3 hover:bg-slate-800 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
            <path
              d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5c-.5.33-1.5.33-1.5-.5z"
              fill="#4CAF50"
            />
            <path d="M3 3.5L13.5 14 3 20.5V3.5z" fill="#81C784" />
            <path d="M13.5 14L17.5 10 3 3.5 13.5 14z" fill="#E53935" />
            <path d="M13.5 14L3 20.5l14.5-6.5-4-4z" fill="#FDD835" />
          </svg>
          <div className="text-left">
            <p className="text-white/60 text-[10px] uppercase tracking-wider">
              Get it on
            </p>
            <p className="font-bold text-base leading-tight">Google Play</p>
          </div>
        </a>
      </div>
    </div>
  );
}
