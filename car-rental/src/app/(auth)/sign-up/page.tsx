"use client"
import { signupSchema } from '@/schema/signupSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import z from "zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
const SignUp = () => {
      const [loading,setLoading] = useState(false)
      const router = useRouter()
      const form = useForm({
            resolver:zodResolver(signupSchema),
            defaultValues:{
                  username:"",
                  email:"",
                  password:""
            }
      })
      const onSubmit = async(data:z.infer<typeof signupSchema>) =>{
            setLoading(true)
            try{
               const response = await axios.post<ApiResponse<[]>>("/api/user/signup",data)
               if(response.data.success){
                     console.log("response :",response.data.data)
                     toast.success(response.data.message)
                     router.replace(`/verify-email/${data?.email}`)
               }
            }catch(err){
               const axiosError = err as AxiosError<ApiResponse<[]>>
               console.log(axiosError)
               toast.error(axiosError.response?.data.message)
            }
            finally{
                  setLoading(false)
            }
      }
      const handleGoogle = async()=>{
            const response = await signIn("google",{ redirect: false })
            if(response?.ok){
                  console.log("Success")
                  router.replace("/")
                  toast.success("Login success")
            }
            if(response?.error){
                  console.log(response.error)
                  toast.error(response.error)
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
            loading ?
            <>
            <Button type="submit" className='w-full'>
            <Loader2 className='animate-spin'/>
             Please wait</Button>
            </>
            :
            <Button type="submit" className='w-full'>Register</Button>
        }
      </form>
    </Form>
    <Button  onClick={handleGoogle} className="w-full my-3">
          <Image src="/google.png"   alt="Google Logo" width={20}  height={10} className="bg-transparent rounded-full" />
          Login with Google</Button>
        <Link href="/sign-in" className="text-[14px] text-indigo-500 font-medium text-left cursour-pointer
         hover:text-indigo-200">Already register ?</Link>
    </div>
    </div>
  )
}

export default SignUp