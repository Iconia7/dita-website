"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RegisterDialogProps {
  eventTitle: string;
}

export function RegisterDialog({ eventTitle }: RegisterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Register Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{eventTitle}</DialogTitle>
          <DialogDescription>Registration form coming soon.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
