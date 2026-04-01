import { Card, CardContent } from "@/components/ui/card";

interface ExecutiveCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
}

export function ExecutiveCard({
  name,
  role,
  image,
  linkedin,
  github,
}: ExecutiveCardProps) {
  return (
    <Card className="group overflow-hidden p-0">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay with social links */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-sky-500 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-sky-500 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <CardContent className="p-4 text-center">
        <h3 className="font-bold text-foreground group-hover:text-sky-600 transition-colors">
          {name}
        </h3>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">
          {role}
        </p>
      </CardContent>
    </Card>
  );
}
