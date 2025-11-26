"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Sharma",
    comment: "Very smooth service, the car was clean and well-maintained. Loved it!",
    rating: 5,
  },
  {
    name: "Priya Verma",
    comment: "Affordable price and friendly support team. Highly recommended!",
    rating: 4,
  },
  {
    name: "Rohan Gupta",
    comment:
      "Quick booking process. The car pickup and drop were extremely easy!",
    rating: 5,
  },
  {
    name: "Sneha Mehta",
    comment: "Great experience overall, will rent again!",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="w-full py-10 px-3 md:px-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        What Our Customers Say ⭐
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 4, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 hover:scale-[1.02] transition"
          >
            <div className="flex mb-2">
              {[...Array(t.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <p className="text-gray-600 italic mb-3">{t.comment}</p>
            <h3 className="font-semibold text-gray-900">— {t.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;