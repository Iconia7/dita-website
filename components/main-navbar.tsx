"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Leadership", path: "/leadership" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="DITA Logo"
            width={48}
            height={48}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-transparent focus:bg-transparent",
                      // Unscrolled: white text over dark hero
                      !scrolled &&
                        "text-white/90 hover:text-white hover:bg-white/10 focus:text-white",
                      // Scrolled: normal theme colors
                      scrolled && "text-foreground hover:text-foreground",
                      // Active link
                      pathname === link.path &&
                        !scrolled &&
                        "text-white font-medium underline underline-offset-4",
                      pathname === link.path &&
                        scrolled &&
                        "text-foreground font-medium underline underline-offset-4",
                    )}
                  >
                    <Link href={link.path}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Join Now button */}
          <Button
            asChild
            size="sm"
            className={cn(
              "ml-4 transition-all",
              !scrolled
                ? "bg-slate-900 text-white hover:bg-slate-800 border-0"
                : "",
            )}
          >
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  !scrolled && "text-white hover:bg-white/10 hover:text-white",
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-70 p-0 flex flex-col">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              {/* Header */}
              <div className="flex items-center px-6 h-16 border-b border-white/20 bg-linear-to-r from-sky-500 to-cyan-400">
                <Image
                  src="/logo.png"
                  alt="DITA Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.path
                        ? "bg-sky-50 text-sky-600 font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-4 pb-8">
                <Button
                  asChild
                  className="w-full bg-linear-to-r from-sky-500 to-cyan-400 text-white font-semibold hover:opacity-90"
                >
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Join Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
