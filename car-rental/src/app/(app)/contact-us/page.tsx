"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
      >
        Contact <span className="text-red-500">Us</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-2xl text-center mt-4"
      >
        Have questions? Need support? We`re here to help.  
        Send us a message and our team will reach out shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl w-full mt-12"
      >
        <Card className="shadow-md bg-white">
          <CardContent className="p-6 space-y-5">

            <div className="space-y-2">
              <label className="font-medium">Your Name</label>
              <Input placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Message</label>
              <Textarea rows={4} placeholder="Type your message..." />
            </div>

            <Button className="w-full text-lg py-3">Send Message</Button>

          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 max-w-xl w-full bg-red-50 border border-red-200 p-6 rounded-xl"
      >
        <h2 className="text-2xl font-semibold text-red-600">Our Contact Details</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
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