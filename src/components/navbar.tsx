import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">Navbar</div>
      </div>

      <div className="ml-auto flex items-center gap-x-8">
        <Link href="/">Pages</Link>
        <Link href="/products">Products</Link>
        <Link href="/price-plans">Price Plans</Link>
      </div>
    </nav>
  );
};

export default Navbar;
