"use client";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
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
    <nav className="fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl  mx-auto px-4">
        {/*MENU BAR*/}
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-primary">
            Devfolio
          </Link>
          <div className="flex gap-4">
            {/* DESKTOP MENU - hidden until screen become larger than medium*/}
            <div className="hidden md:flex gap-6 items-center">
              {menuItems.map((item) => {
                const isActive = pathName === item.href;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`hover:text-primary transition-colors font-medium ${
                      isActive ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            {/* dark theme button */}
            <button
              onClick={toggleTheme}
              className="group hover:bg-gray-200 hover:dark:bg-gray-200 p-2 rounded-lg transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
              ) : (
                <MoonIcon className="w-5 h-5 group-hover:text-primary transition-colors" />
              )}
            </button>
            {/* MOBILE MENU - visible until screen is smaller than medium*/}
            <button
              onClick={toggleMobileMenu}
              className="group md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                // close icon
                <XMarkIcon className="w-6 h-6 group-hover:text-primary group-hover:dark:text-dark" />
              ) : (
                <Bars3Icon className="w-6 h-6 group-hover:text-primary group-hover:dark:text-dark transition-colors" />
              )}
            </button>
          </div>
        </div>
        {/* The mobile menu items - below the MENU BAR*/}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            {menuItems.map((item) => (
              <Link
                onClick={toggleMobileMenu}
                key={item.href}
                href={item.href}
                className="block p-2 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
