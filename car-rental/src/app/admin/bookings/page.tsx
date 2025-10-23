"use client"
import { type Booking } from '@/model/booking.model'
import { Car } from '@/model/car.model'
import { ApiResponse } from '@/types/ApiResponse'
import axios,{ AxiosError }from 'axios'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Booking = () => {
  const [loading,setLoading] = useState(false)
  const [booking,setBooking] = useState<Booking[]>([])
  const fetchCars = async()=>{
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse<Booking[]>>("/api/admin/bookings")
      if(response?.data?.success){
          setBooking(response.data.data || [])
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<Car>>
      toast.error(axiosError.response?.data.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchCars()
  },[])
 console.log(booking)
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-center text-xl md:text-2xl font-bold text-red-400'>
      Pending Booking</h1>
      {
      loading ? 
      <Loader className='animate-spin'/>
      : 
    <div className="w-full  max-w-xs md:max-w-3xl text-left border border-gray-300 rounded-lg
      max-h-80 overflow-auto md:overflow-scroll  mt-3">
     <table className="w-full">
      <thead className='bg-gray-50'>
            <tr className='text-center'>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Sr No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>User</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Car No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Start Date</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>End Date</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Total Price</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Status</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Action</th>
            </tr>
      </thead>
      <tbody>
            {
            booking.filter((book:Booking)=>book.status === "Booked")
            .map((book: Booking, index: number) => (
                  <tr key={book?._id?.toString() || index} className='text-center' >
                  <td className='border-b-2 py-2 px-3 md:px-10'>{index+1}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{book?.email}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{book?.carNumber}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.startDate}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.endDate}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.totalPrice}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.status}</td>
                  <td>
                  </td>
                  </tr>
            ))
            }
      </tbody>
     </table>
    </div>
     }
     <h1 className='text-center text-xl md:text-2xl font-bold text-red-400'>
      Completed Booking</h1>
      {
      loading ? 
      <Loader className='animate-spin'/>
      : 
    <div className="w-full  max-w-xs md:max-w-3xl text-left border border-gray-300 rounded-lg
      max-h-80 overflow-auto md:overflow-scroll  mt-3">
     <table className="w-full">
      <thead className='bg-gray-50'>
            <tr className='text-center'>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Sr No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>User</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Car No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Start Date</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>End Date</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Total Price</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Status</th>
            </tr>
      </thead>
      <tbody>
            {
            booking.filter((book:Booking)=>book.status === "Completed")
            .map((book: Booking, index: number) => (
                  <tr key={book?._id?.toString() || index} className='text-center' >
                  <td className='border-b-2 py-2 px-3 md:px-10'>{index+1}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{book?.email}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{book?.carNumber}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.startDate}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.endDate}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.totalPrice}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{book?.status}</td>
                  </tr>
            ))
            }
      </tbody>
     </table>
    </div>
     }
    </div>
  )
}

export default Booking