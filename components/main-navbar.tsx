"use client";

import { useState, useEffect } from "react";
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
            <Link href="/contact">Join Now</Link>
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
                    onClick={() => setOpen(false)}
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
                  <Link href="/" onClick={() => setOpen(false)}>
                    Join Now
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
