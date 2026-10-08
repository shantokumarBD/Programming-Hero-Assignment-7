import Link from "next/link";
import React from "react";
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Row: Logo & Auth */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo & Date */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12  rounded-xl bg-bd-primary flex items-center justify-center text-white text-xl">
              🛒
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-bold text-bd-text leading-tight">
                বাজার দর
              </h1>
              <p className="text-[10px] md:text-xs text-bd-text-muted mt-0.5">
                <CurrentDate></CurrentDate>
              </p>
            </div>
          </div>
        </Link>

        {/* Right: Auth Buttons */}
        <AuthButtons></AuthButtons>
      </div>

      {/* Bottom Row: Categories */}
      <div className="bg-white border-t border-bd-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
