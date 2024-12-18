import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { Session } from "next-auth";

function Header({ session }: { session: Session | null }) {
  return (
    <header>
      <nav className="relative shadow-[0px_3px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_1px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-2 px-3 sm:px-4 lg:px-8 ">
            <div className="logo_container">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  priority
                  width={60}
                  height={60}
                />
              </Link>
            </div>

            <NavLinks />

            <div className="flex items-center space-x-2">
              {session !== null ? (
                <Link href="/account" className="hidden md:block btn-primary ">
                  Account
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className="btn-primary hidden md:block"
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/login"
                    className="btn-primary hidden md:block"
                  >
                    Login
                  </Link>
                </>
              )}
              <MobileMenu session={session} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
