import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <Card className="group hover:border-sky-300 transition-all duration-300">
      <CardContent className="p-8 space-y-4">
        <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
