"use client"
import { ApiResponse, DashboardStats } from '@/types/ApiResponse'
import axios from 'axios'
import { CalendarCheck, Car, IndianRupee, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
const AdminDashboard = () => {
  const [total,setTotal] = useState<DashboardStats>({
  totalusers: 0,
  totalcars: 0,
  totalBooking: 0,
  totalRevenue: 0,
  })
  const fetchDetails = async ()=>{
    try {
      const response = await axios.get<ApiResponse<DashboardStats>>("/api/admin/dashboard") 
      if(response.data.success){
          setTotal(response.data.data as DashboardStats) 
          console.log(response.data.data)
      }
    }catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      fetchDetails()
  },[])
  console.log(total)
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <Users className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Users:
          <span className="text-red-500 ml-1 font-bold">{total?.totalusers || "0"}</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <Car className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Available Cars:
          <span className="text-red-500 ml-1 font-bold">{total?.totalcars || "0"}</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <CalendarCheck className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Bookings:
          <span className="text-red-500 ml-1 font-bold">{total?.totalBooking || "0"}</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <IndianRupee className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Revenue:
          <span className="text-red-500 ml-1 font-bold">₹{total?.totalRevenue || "0"}</span>
        </h1>
      </div>
    </div>
  )
}

export default AdminDashboard