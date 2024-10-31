"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, navItems } from "@/interface/links";

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-3">
      {navItems.map(([label, path]: NavItem, index: number) => (
        <Link
          href={path}
          key={index}
          className={`font-semibold transition-colors ${
            pathname === path
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
