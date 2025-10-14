"use client"; 
import { loginSchema } from "@/schema/loginSchema";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
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
const SignIn = () => {
   const [isLoading,setisLoading] = useState(false)
   const form = useForm<z.infer <typeof loginSchema>>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      identifier:"",
      password:""
    }
   })
   const onSubmit = async(data:z.infer<typeof loginSchema>) =>{
        setisLoading(true)
        const res = await signIn("credentials", {
                  redirect: false,
                  identifier: data.identifier,
                  password: data.password
            })
            console.log(res)
            if (res?.error) {
                  setisLoading(false)
                  toast.error(res.error)
            }
            if (res?.ok) {
                  setisLoading(false)
                  toast.success("Log in success")
                  // redirect("/dashboard")
                  // router.replace("/dashboard")
            }
   }
   const handleGoogle = async()=>{
            const res = await signIn("google")
            console.log(res)
            if (res?.error) {
                  toast.error(res.error)
            }
            if (res?.ok) {
                  console.log("Login success")
                  toast.success("Log in success")
                  // redirect("/dashboard")
                  // router.replace("/dashboard")
            }
   }
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <div className="h-auto w-full px-6 md:px-10 flex flex-col justify-center items-center max-w-sm 
      py-6 shadow-sm shadow-indigo-300 rounded-xl mx-5 bg-white">
        <Image src="/logo.jpg"   alt="Car Rental Logo" width={250}  height={180} />
        <p className="text-[12px] md:text-[16px] my-3 text-center font-medium text-gray-400">
            Rent cars easily and drive anywhere with confidence. Affordable, fast, and reliable.
        </p>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
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
            <Button type="submit" className="w-full">Login</Button>
      }
      </form>
    </Form>
    <Button  onClick={handleGoogle} className="w-full my-3">
      <Image src="/google.png"   alt="Google Logo" width={20}  height={10} className="bg-transparent rounded-full" />
      Login with Google</Button>
    <Link href="/" className="text-[14px] text-indigo-500 font-medium text-left cursour-pointer
     hover:text-indigo-200">Not register yet?</Link>
     </div>
    </div>
  );
};

export default SignIn;