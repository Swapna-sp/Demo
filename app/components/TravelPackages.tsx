"use client";

import React, { useEffect, useState } from "react";

interface Package {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
}

const TravelPackages = ({ apiUrl }: { apiUrl: string }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_PACKAGE_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setPackages(data);
    } catch (err) {
      console.error("Failed to fetch packages:", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [apiUrl]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-20 mb-20">
      {loading ? (
        <div className="col-span-full text-center text-gray-500">Loading...</div>
      ) : packages.length > 0 ? (
        packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              src={pkg.imageUrl}
              alt={pkg.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>{pkg.duration} days</span>
                <span>${pkg.price}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No packages available
        </div>
      )}
    </div>
  );
};

export default TravelPackages;
