"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
      const [showMenu,setShowMenu] = useState(false)
      useEffect(() => {
      const handleClick = () => setShowMenu(false)
      if (showMenu) {
        document.addEventListener("click", handleClick)
      } else {
        document.removeEventListener("click", handleClick)
      }
      return () => document.removeEventListener("click", handleClick)
      }, [showMenu])
      const {data:session} = useSession()
      console.log(session)
  return (
    <div className='flex justify-around items-center'>
      <Image src="/logo.jpg"   alt="Car Rental Logo" width={200}  height={150} />
      <nav className='hidden md:flex gap-5'>
            <Link href={"/"} className='text-[17px] text-black font-medium hover:text-red-500' >Home</Link>
            <Link href={"/cars"} className='text-[17px] text-black font-medium hover:text-red-500'>Cars</Link>
            <Link href={"/about-us"} className='text-[17px] text-black font-medium hover:text-red-500'>About</Link>
            <Link href={"/contact-us"} className='text-[17px] text-black font-medium hover:text-red-500'>Contact us</Link>
            {
            session &&
                  <Link href={"/my-profile"} className='text-[17px] text-black font-medium hover:text-red-500'>My Profile</Link>
            }
      </nav>

      <div className='hidden md:block'>
      {
            session ?
            <button  className='px-6 py-2 rounded bg-indigo-300 hover:bg-indigo-100 cursor-pointer text-black
            font-medium' onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</button>
            :
            <Link href={"/sign-in"} className='px-6 py-2 rounded bg-indigo-300 hover:bg-indigo-100 cursor-pointer text-black
            font-medium'>Login</Link>
      }
      </div>

      <button className='block md:hidden text-[17px] font-medium text-black' onClick={(e)=>{e.stopPropagation()
            setShowMenu(!showMenu)}}>
            {showMenu ? "X" : "☰"}
      </button>

      {/* for mobile screen */}
      {
            showMenu &&
            <nav className="absolute top-12 right-0 w-50 bg-gray-50 flex flex-col items-center 
            gap-4 py-5 shadow-md md:hidden" onClick={(e) => e.stopPropagation()}>
            <Link href={"/"} className='text-[17px] text-black font-medium hover:text-red-500' >Home</Link>
            <Link href={"/cars"} className='text-[17px] text-black font-medium hover:text-red-500'>Cars</Link>
            <Link href={"/about-us"} className='text-[17px] text-black font-medium hover:text-red-500'>About</Link>
            <Link href={"/contact-us"} className='text-[17px] text-black font-medium hover:text-red-500'>Contact us</Link>
            {
            session ?
            <>
            <Link href={"/my-profile"} className='text-[17px] text-black font-medium hover:text-red-500'>My Profile</Link>
            <button className='px-6 py-2 rounded bg-indigo-300 hover:bg-indigo-100 cursor-pointer text-black
            font-medium' onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</button>
            </>
            :
            <Link href={"/sign-in"} className='px-6 py-2 rounded bg-indigo-300 hover:bg-indigo-100 cursor-pointer text-black
            font-medium'>Login</Link>
            }
            </nav>
      }
    </div>
  )
}

export default Navbar