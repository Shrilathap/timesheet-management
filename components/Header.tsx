"use client";

import { useBreadcrumbs } from "@/context/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { breadcrumbs } = useBreadcrumbs();
   const [open, setOpen] = useState(false);

   const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
    localStorage.clear();
    router.push("/login");
   }  

  return (
    <header className="sticky top-0 flex items-center justify-between w-full bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-3 shadow">
      {/* Left side: Logo + Breadcrumbs (desktop/tablet only) */}
      <div className="flex items-center">
        {/* Logo */}
        <div className="font-bold text-xl md:text-2xl">ticktock</div>

        {/* Breadcrumbs: hidden on mobile */}
        <nav className="hidden md:flex ml-6 text-sm text-gray-700 overflow-x-auto font-medium">
          <ol className="flex space-x-2 whitespace-nowrap">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Right side: User info */}
      <button 
      onClick={() => setOpen(!open)}
      className="relative inline-flex text-sm md:text-base truncate text-gray-500 font-lg cursor-pointer">
        John Doe
        <Image
          src="/images/down-arrow.svg"
          alt="Drop down"
          width={24}
          height={24}
          className="inline-block ml-2 rounded-full text-gray-500"
        />
      </button>


      {open && (
        <div className="absolute right-0 top-[40px] mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
