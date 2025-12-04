"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "../shared/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {
  //   const isDarkMode = document.documentElement.classList.contains("dark");
  //   setIsDark(isDarkMode);
  // }, []);

  // const toggleTheme = () => {
  //   const html = document.documentElement;
  //   if (isDark) {
  //     html.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   } else {
  //     html.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   }
  //   setIsDark(!isDark);
  // };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "All Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 glass">
      <div className="mx-auto container px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button> */}

            {/* Auth Buttons - Desktop */}
            <div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 cursor-pointer">
                <Link href="/auth/login">Log In</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-full"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
