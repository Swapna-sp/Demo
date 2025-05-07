"use client";

import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";

interface Package {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
}

let hasFetchedGlobal = false;
const TravelPackages = ({ apiUrl }: { apiUrl: string }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    if (hasFetchedGlobal) return;
    hasFetchedGlobal = true;

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

    fetchPackages();
  }, [apiUrl]);

  useEffect(() => {
    let interacted = false;
    let timer: NodeJS.Timeout;

    const handleInteraction = () => {
      if (interacted || user) return;
      interacted = true;

      timer = setTimeout(() => {
        if (!user) {
          router.push("/login");
        }
      }, 3000);
    };

    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      clearTimeout(timer);
    };
  }, [user, router]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6 mt-20 mb-20">
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
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-sm text-black mt-1">{pkg.description}</p>
              <div className="mt-2 flex justify-between text-sm text-black">
                <span>{pkg.duration} days</span>
                <span className="text-black">
                  From{" "}
                  {user ? (
                    `$${pkg.price}`
                  ) : (
                    <span
                      className="select-none"
                      style={{ filter: "blur(2px)", opacity: 0.7 }}
                    >
                      ${pkg.price}
                    </span>
                  )}
                </span>
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
