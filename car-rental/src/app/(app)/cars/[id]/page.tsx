"use client"
import { Button } from '@/components/ui/button';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
interface propsInterface{
      params: {
      id:string;
      }
}
interface Car {
            _id: string;
            brand:string;
            carNumber:string,
            carModel:number;
            type:string;
            seats:number;
            fuelType:"Diesel" | "Petrol";
            transmission:"Automatic"| "Manual";
            pricePerDay:number;
            images:Array<{url:string}>;
            available:boolean;
}
const Page = (props:propsInterface) => {
      const id  = props.params.id
      const [car,setCar] = useState<Car | null>(null)
      const [loading,setLoading] = useState(false)
      const [mainImage,setMainImage] = useState<string>("")
      useEffect(()=>{
      const fetchCar = async() =>{
            setLoading(true)
      try {
            const response = await axios.get<ApiResponse<Car>>(`/api/car/${id}`)
            if(response.data.success){
                  const fetchedCar = response.data.data!
                  setCar(fetchedCar)
                  setMainImage(fetchedCar.images[0]?.url || "")
            }
      }catch (error) {
            const axiosError = error as AxiosError <ApiResponse<Car>>
            toast.error(axiosError.response?.data.message)
      }finally{
            setLoading(false)
      }
      }
      fetchCar()
      },[id])
      if(loading){
            return (
            <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
            <Loader2 className='animate-spin w-8 h-8'/>
            </div>
      )
      }
      if(!car){
            return (
            <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
            <h1 className='text-2xl font-bold text-indigo-600'>Car not found</h1>
            </div>
            )
      }
      return (
            <div className='w-full px-10 py-5 bg-gray-50'>
            <div className='md:px-6'>
            <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className='text-xl font-bold text-black'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cars" className='text-xl font-bold text-black'>Cars</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-xl '>{car.brand} {car.carModel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-6 md:gap-12
            justify-center items-center'>
             <div className='space-y-6 w-full max-w-3xl py-4  md:py-4 md:px-6 rounded-xl  '>
             <div className="w-full rounded-xl overflow-hidden ">
                  <Image src={mainImage} width={900} height={500} alt='mainimage'
                   className="w-full max-h-[400px] md:max-h-[500px] object-cover object-center rounded-xl"/>
                  <div className="flex flex-wrap gap-1 md:gap-3 overflow-x-auto">
                  {
                    car.images.map((img,i)=>(
                        <div key={i} 
                        onClick={() => setMainImage(img.url)}
                        className={`my-2 md:my-6 cursor-pointer rounded-xl overflow-hidden border-2 transition 
                        ${mainImage === img.url ? "border-indigo-500 " : "border-transparent"}`}>
                        <Image src={img.url} width={50} height={100} alt='mainimage'
                        className="w-20 md:w-30 h-15 md:h-20 object-cover duration-300 rounded "/>  
                        </div>
                    ))    
                  }
                  </div>
             </div>
             </div>
             <div className="bg-white w-full py-4 space-y-4 px-6 flex flex-col justify-center items-center rounded-2xl shadow-xl border">

                  <div className='text-center space-y-2'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
                      {car.brand} {car.carModel}
                    </h1>
                    <p className='text-gray-500 text-lg'>
                      Registration No: <span className='font-medium text-gray-700'>{car.carNumber}</span>
                    </p>
                  </div>
                  
                  <div className="w-full space-y-4">
                  
                    <div className="flex flex-col items-center bg-gray-50 py-1 md:py-3 rounded-xl shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="text-xl font-semibold text-gray-800">{car.fuelType}</p>
                    </div>
                  
                    <div className="flex flex-col items-center bg-gray-50 py-1 md:py-3 rounded-xl shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="text-xl font-semibold text-gray-800">{car.transmission}</p>
                    </div>
                  
                    <div className="flex flex-col items-center bg-gray-50 py-1 md:py-3 rounded-xl shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="text-xl font-semibold text-gray-800">{car.type}</p>
                    </div>
                  
                    <div className="flex flex-col items-center bg-gray-50 py-1 md:py-3 rounded-xl shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="text-xl font-semibold text-gray-800">{car.seats}</p>
                    </div>
                  
                  </div>
                  
                  <div className="flex text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-indigo-600 tracking-tight">
                      ₹{car.pricePerDay} {" "}
                      <span className="text-black text-xl md:text-2xl font-sans">per day</span>
                    </p>
                  </div>
                  
                  <Button className='w-full py-6 md:text-xl'>
                    Check Availability
                  </Button>
                  </div>
            </div>  
            </div>
      )
}
export default Page