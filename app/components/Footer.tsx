"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold italic text-gray-800">farefirst</h2>
          <p className="text-sm mt-4">
            Helps you find the cheapest flight deals to any destination with ease.
          </p>
          <p className="text-sm mt-2">
            Browse through the best hotels and find exclusive deals.
          </p>
        </div>

       
        <div>
          <h3 className="font-semibold text-lg mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Android App</li>
            <li>iOS App</li>
            <li>About Nomad</li>
            <li>Blog</li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold text-lg mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>Flights</li>
            <li>Hotels</li>
            <li>Nomad</li>
            <li className="flex items-center gap-1">
              Package{" "}
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                New
              </span>
            </li>
            <li>Visa</li>
            <li>eSIM</li>
            <li>Experience</li>
            <li>Offers</li>
            <li>Mobile app</li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-semibold text-lg mb-3">More</h3>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Shipping & Delivery Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
