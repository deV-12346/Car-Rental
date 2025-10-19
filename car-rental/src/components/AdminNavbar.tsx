"use client"
import { CalendarCheck, Car, LayoutDashboard,  Upload as UploadIcon, User2} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const AdminNavbar = () => {
      const pathName = usePathname()
      const [minimize,setMinimize] = useState(false)
  return (
    <div className={` min-h-screen flex flex-col items-center border-r-2 ${minimize ? "w-10" : "w-30 md:w-60"}`}>
      {
            !minimize &&
            <Image src="/logo.jpg"  alt="Car Rental Logo" width={250}  height={250}
            className="mt-4 rounded-md object-contain" />
      }
      <nav className='flex flex-col gap-8 md:gap-6 py-5'>
            <Link href={"/admin/dashboard"}
             className={`flex items-center gap-2 ${pathName === "/admin/dashboard" ? "text-indigo-500" : "text-black font-medium hover:text-indigo-500"}`}>
            <LayoutDashboard/>{!minimize && "Dashboard"}</Link>
             
             <Link href={"/admin/users"}
             className={`flex items-center gap-2 ${pathName === "/admin/user" ? "text-indigo-500" : "text-black font-medium hover:text-indigo-500"}`}>
            <User2/>{!minimize && "Users"}</Link>

            <Link href={"/admin/cars"}
             className={`flex items-center gap-2 ${pathName === "/admin/cars" ? "text-indigo-500" : "text-black font-medium hover:text-indigo-500"}`} 
            ><Car/>{!minimize && "Cars"}</Link>

            <Link href={"/admin/bookings"}
             className={`flex items-center gap-2 ${pathName === "/admin/bookings" ? "text-indigo-500" : "text-black font-medium hover:text-indigo-500"}`}
            ><CalendarCheck/>{!minimize && "Bookings"}</Link>

            <Link href={"/admin/upload-car"}
              className={`flex items-center gap-2 ${pathName === "/admin/upload-car" ? "text-indigo-500" : "text-black font-medium hover:text-indigo-500"}`}
            ><UploadIcon/>{!minimize && "Upload-Car"}</Link>

      </nav>
      <button
        onClick={() => setMinimize(!minimize)}
        className="font-extrabold text-2xl md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
      >
      {minimize ? "»" : "«"}
      </button>
    </div>
  )
}

export default AdminNavbar