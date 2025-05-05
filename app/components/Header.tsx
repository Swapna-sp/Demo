import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
       
        <div className="flex items-center gap-8">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/white-icon.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold italic">farefirst</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-5 text-sm font-medium">
            
            <Link href="/package" className="hover:text-gray-300">Packages</Link>
          </nav>
          
        </div>

     
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1 bg-blue-700 px-3 py-1 rounded text-sm">
            🇮🇳 INR
          </button>
          <Link href="/login">
               <button className="bg-white text-blue-900 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Login
              </button>
          </Link>



        </div>
      </div>
    </header>
  );
};

export default Header;
