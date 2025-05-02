'use client';

import { MapPinned, Settings, BookOpen } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="bg-[#0B1BB2] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
     
        <div className="flex items-start gap-4 max-w-sm">
          <MapPinned size={40} className="text-white" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Explore the World</h3>
            <p className="text-gray-200">
              Start to discover. We will help you to visit any place you can imagine
            </p>
          </div>
        </div>


        <div className="flex items-start gap-4 max-w-sm">
          <Settings size={40} className="text-white" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Personalized Offers</h3>
            <p className="text-gray-200">
              Save more with offers and coupons personalized for your travel needs
            </p>
          </div>
        </div>

   
        <div className="flex items-start gap-4 max-w-sm">
          <BookOpen size={40} className="text-white" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Book Smart</h3>
            <p className="text-gray-200">
              Find cheapest flight deals from several websites across the world with ease
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
