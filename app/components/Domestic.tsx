'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image'; 
const destinations = [
  {
    name: 'Thailand',
    price: '₹1,06,200',
    image: '/domestic.jpg',
  },
  {
    name: 'Dubai',
    price: '₹15,200',
    image: '/india.jpg',
  },
  {
    name: 'Vietnam',
    price: '₹12,800',
    image: '/domestic.jpg',
  },
  {
    name: 'Malaysia',
    price: '₹80,000',
    image: '/india.jpg',
  },
  {
    name: 'Maldives',
    price: '₹67,800',
    image: '/domestic.jpg',
  },
  {
    name: 'Singapore',
    price: '₹82,900',
    image: '/india.jpg',
  },
  {
    name: 'Bali',
    price: '₹30,400',
    image: '/domestic.jpg',
  },
];

export default function InternationalDestinations() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">International Destinations!</h2>
          <div className="flex gap-2">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {destinations.map((dest) => (
            <div key={dest.name} className="rounded-lg overflow-hidden">
              <Image
                src={dest.image}
                alt={dest.name}
                width={500} 
                height={300} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h3 className="font-semibold">{dest.name}</h3>
                <p className="text-sm text-gray-500">Starting at {dest.price} Per person</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
