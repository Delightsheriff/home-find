"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { NavItem, navItems } from "@/interface/links";

interface MobileMenuProps {
  session: Session | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ session }) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="text-3xl font-bold md:hidden"
        onClick={() => setOpen(true)}
      >
        <RiMenu3Fill />
      </button>

      <div
        className={`fixed inset-0 bg-orange-A700 z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto`}
      >
        <div className="flex flex-col min-h-screen p-10">
          <button
            className="self-end text-3xl text-white mb-8"
            onClick={() => setOpen(false)}
          >
            <RiCloseFill />
          </button>
          <div className="flex flex-col space-y-8 items-center">
            {navItems.map(([label, path]: NavItem, index: number) => (
              <Link
                href={path}
                key={index}
                className={`w-full py-4 text-lg font-semibold text-center transition-colors ${
                  pathname === path
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-orange-100"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            {session ? (
              <Link
                href="/account"
                className="btn-primary w-full py-4 text-lg font-medium text-center"
                onClick={() => setOpen(false)}
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="btn-primary w-full py-4 text-lg font-medium text-center"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/signin"
                  className="btn-primary w-full py-4 text-lg font-medium text-center"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
