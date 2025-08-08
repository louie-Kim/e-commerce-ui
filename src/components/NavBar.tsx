"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        {/*  width={36} height={36} : default로 넣어야 함. */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        {/* tracking-wider: 글자 사이 간격 넓게 */}
        <p className="hidden md:block text-md font-medium tracking-wider">
          Trend JY
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600"/>
        <ShoppingCart className="w-4 h-4 text-gray-600"/>
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default NavBar;
