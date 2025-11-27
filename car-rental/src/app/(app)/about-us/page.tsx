"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
      >
        About <span className="text-red-500">RentMyRide</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 ,y: -40 }}
        animate={{ opacity: 1 ,y: 0 }}
        transition={{ delay: 0.3 ,duration: 3 }}
        className="text-gray-600 max-w-2xl text-center mt-4"
      >
        We are on a mission to make car renting simple, fast and affordable.
        Whether you`re traveling, exploring, or commuting — we provide the best cars at the best prices.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay:1 ,duration: 3 }}
        >
          <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                🚗 Wide Range of Cars
              </h2>
              <p className="text-gray-600">
                Choose from  Sedans, SUVs, Luxury Cars & more.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay:2 ,duration: 3 }}
        >
          <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                💰 Affordable Prices
              </h2>
              <p className="text-gray-600">
                Best prices guaranteed with no hidden charges.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay:1.3 ,duration: 3 }}
        >
          <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                ⭐ Trusted Service
              </h2>
              <p className="text-gray-600">
                24/7 support & quick assistance for a smooth journey.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay:2 ,duration: 3 }}
        className="max-w-3xl mt-20 bg-white shadow-sm p-8 rounded-xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
          CarRental started with a simple idea — provide a seamless and affordable
          mobility experience to everyone. From a small garage with 5 cars, today we
          have grown across multiple cities serving thousands of happy customers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay:2 ,duration: 3 }}
        className="max-w-3xl mt-12 bg-red-50 border border-red-200 p-8 rounded-xl"
      >
        <h2 className="text-2xl font-semibold text-red-600">Contact Us</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">
          📍 Location: Shimla ,Himachal  
          <br />
          📞 Phone: +91 70186 74227
          <br />
          ✉ Email: dr395108@gmail.com 
        </p>
      </motion.div>

    </div>
  );
}