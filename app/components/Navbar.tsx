"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const theme = "dark"; // TODO: get the theme from context
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const pathName = usePathname();

  function toggleMobileMenu() {
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full bg-dark/80 background-blur-sm z-50">
      <div className="max-w-7xl  mx-auto px-4">
        {/* DESKTOP MENU */}
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-primary">
            Devfolio
          </Link>
          {/* MENU ITEMS */}
          <div className="hidden md:flex gap-6 items-center">
            {menuItems.map((item) => {
              const isActive = pathName === item.href;

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`hover:text-primary transition-colors ${
                    isActive ? "text-primary text-m" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="group hover:bg-gray-800 hover:dark:bg-gray-200 p-2 rounded-lg transition-colors">
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 group-hover:text-gray-900" />
              ) : (
                <MoonIcon className="w-5 h-5 group-hover:text-gray-400" />
              )}
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
      </div>
    </nav>
  );
}
