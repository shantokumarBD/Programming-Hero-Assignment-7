import Link from "next/link";
import React from "react";
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-bd-border">
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
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/signin">
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-bd-text  rounded-lg cursor-pointer">
              সাইন ইন
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-white bg-bd-primary rounded-lg shadow-md shadow-bd-primary/40 hover:bg-bd-primary-hover transition cursor-pointer">
              সাইন আপ
            </button>
          </Link>
        </div>
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
