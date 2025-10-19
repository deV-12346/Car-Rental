"use client"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {Loader2} from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { verifyOtp } from '@/schema/verifyotp';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
const VerifyEmail = () => {
      const [isLoading,setisLoading] = useState(false)
      const router = useRouter()
      const params = useParams<{email:string}>()
      const email = params.email ? decodeURIComponent(params.email) : ""
      const form = useForm({
            resolver:zodResolver(verifyOtp),
            defaultValues:{
                  otp:""
            }
      })
      const onSubmit = async(data:z.infer<typeof verifyOtp>) =>{
            setisLoading(true)
            try {
                 const response = await axios.post<ApiResponse>("/api/user/verifyotp",{email,otp:data.otp})
                 if(response.data.success){
                  toast.success(response.data.message)
                  router.replace("/sign-in")
                 }
            } catch (error) {
                  const axiosError = error as AxiosError<ApiResponse>
                  toast.error(axiosError.response?.data.message)
            }finally{
                  setisLoading(false)
            }
      }
  return (
     <div className="flex justify-center items-center w-full h-screen bg-gray-50">
          <div className="h-auto w-full px-6 md:px-10 flex flex-col justify-center items-center max-w-sm 
          py-6 shadow-sm shadow-indigo-300 rounded-xl mx-5 bg-white">
            <Image src="/logo.jpg"   alt="Car Rental Logo" width={250}  height={180} />
            <p className="text-xl md:text-2xl my-3 text-center font-medium text-gray-600">
               Verify your email
            </p>
             <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="One Time Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          {
                isLoading ?
                <>
                <Button type="submit" className="w-full" disabled> <Loader2 className="animate-spin"/>Please wait</Button>
                </>
                :
                <Button type="submit" className="w-full">Verify OTP</Button>
          }
          </form>
        </Form>
        <Link href="/sign-up" className="text-[14px] text-indigo-500 font-medium mt-2 cursour-pointer
         hover:text-indigo-200">Back</Link>
         </div>
        </div>
  )
}

export default VerifyEmail