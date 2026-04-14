"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Leadership", path: "/leadership" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="DITA Logo"
            width={48}
            height={48}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Join Now</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Image
                    src="/logo.png"
                    alt="DITA Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              <Separator className="my-4" />

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.path
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button asChild className="w-full" size="sm">
                  <Link href="/contact">Join Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
