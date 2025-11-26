"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaCar } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaCar className="text-blue-400 text-2xl" />
              <h2 className="text-xl font-semibold text-white">Car Rental</h2>
            </div>
            <p className="text-sm">
              Rent premium cars at affordable prices.  
              Your comfort and safety is our priority.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/cars" className="hover:text-blue-400">Browse Cars</Link></li>
              <li><Link href="/about-us" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            </div>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Car Rental. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;