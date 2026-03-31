import { MapPin, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RegisterDialog } from "@/components/event-register-dialog";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
}

export function EventCard({
  title,
  date,
  time,
  location,
  category,
  image,
}: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-4 right-4">{category}</Badge>
      </div>

      <CardHeader>
        <p className="text-sm font-semibold text-slate-500">{date}</p>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{location}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <RegisterDialog eventTitle={title} />
      </CardFooter>
    </Card>
  );
}
