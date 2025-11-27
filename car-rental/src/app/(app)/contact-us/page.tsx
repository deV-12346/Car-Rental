"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactValidation } from "@/schema/contact";
import {z} from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
export default function ContactUs() {
  const [loading,setLoading] = useState(false)
  const form = useForm<z.infer <typeof contactValidation>>({
    resolver:zodResolver(contactValidation),
    defaultValues:{
        name:"",
        email:"",
        message:""
    }
  })
  const sendMessage = async(data:z.infer<typeof contactValidation>) =>{
        setLoading(true)
        try {
          const response = await axios.post<ApiResponse<[]>>("/api/user/contact",data)
          if(response.data.success){
            toast.success(response.data.message,{duration:15000})
            form.reset()
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse<[]>>
          toast.error(axiosError.response?.data.message,{duration:15000})
        }finally{
          setLoading(false)
        }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3,delay:2 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
      >
        Contact <span className="text-red-500">Us</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 , y: -30 }}
        animate={{ opacity: 1 ,y: 0 }}
        transition={{ delay: 2.2,duration: 3 }}
        className="text-gray-600 max-w-2xl text-center mt-4"
      >
        Have questions? Need support? We`re here to help.  
        Send us a message and our team will reach out shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 3,duration: 3 }}
        viewport={{ once: true }}
        className="max-w-xl w-full mt-12 bg-white px-6 py-10 rounded-2xl"
      >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(sendMessage)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Enter your e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type message here...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          loading 
          ? 
          <Button type="submit" className="w-full"><Loader2 className="animate-spin"/>
          Sending</Button>
          :
          <Button type="submit"className="w-full">Send Message</Button>
        }
      </form>
      </Form>
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