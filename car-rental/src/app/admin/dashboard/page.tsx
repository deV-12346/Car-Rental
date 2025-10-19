"use client"
import { CalendarCheck, Car, IndianRupee, Users } from 'lucide-react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <Users className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Users:
          <span className="text-red-500 ml-1 font-bold">400</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <Car className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Available Cars:
          <span className="text-red-500 ml-1 font-bold">400</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <CalendarCheck className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Bookings:
          <span className="text-red-500 ml-1 font-bold">400</span>
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center border shadow-md shadow-gray-400 rounded-xl p-6 hover:shadow-lg transition-all">
        <IndianRupee className="w-8 h-8 text-indigo-600 mb-2" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Total Revenue:
          <span className="text-red-500 ml-1 font-bold">₹400</span>
        </h1>
      </div>
    </div>
  )
}

export default AdminDashboard