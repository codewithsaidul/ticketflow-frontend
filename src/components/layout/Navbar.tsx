"use client";

import { Button } from "@/components/ui/button";
import { useLogOut } from "@/hooks/useLogOut";
import { useAppSelector } from "@/redux/hooks";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "../shared/Logo";
import ProfileAvatar from "./profile-avatar";
import { UserRole } from "@/types";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useLogOut();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "All Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ];

  const { user } = useAppSelector((state) => state.auth);

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
          <div className="flex items-center gap-2">
            {/* Auth Buttons - Desktop */}
            {user ? (
              <ProfileAvatar
                name={user?.name}
                userRole={user?.role as UserRole}
                logOutFn={logout}
              />
            ) : (
              <Button asChild variant="default" size="sm" className="text-sm">
                <Link href="/auth/login">Log In</Link>
              </Button>
            )}

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
