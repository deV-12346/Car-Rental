"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const Navbar = () => {
      const [showMenu,setShowMenu] = useState(false)
      const router = useRouter()
      const pathName = usePathname()
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
  <div className="sticky top-0 z-50 bg-white shadow-sm">
    <div className='flex justify-around items-center shadow-md shadow-indigo-500'>
      <Image src="/logo.jpg"   alt="Car Rental Logo" width={200}  height={150} />
      <nav className='hidden md:flex gap-5'>
            <Link href="/" className={pathName === "/" ? "text-red-500 font-bold" : "text-black"} >Home</Link>
            <Link href="/cars" className={pathName === "/cars" ? "text-red-500 font-bold" : "text-black"} >Cars</Link>
            <Link href="/about-us" className={pathName === "/about-us" ? "text-red-500 font-bold" : "text-black"} >About us</Link>
            <Link href="/contact-us" className={pathName === "/contact-us" ? "text-red-500 font-bold" : "text-black"} >Contact us</Link>

            {
            session &&
            <Link href="/my-profile" className={pathName === "/my-profile" ? "text-red-500 font-bold" : "text-black"} >My Profile</Link> 
            }
      </nav>

      <div className='hidden md:block'>
      {
            session ?
            <Button onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</Button>
            :
            <Button onClick={()=>router.push("/sign-in")}>Login</Button>
            // <Link href={"/sign-in"} className='px-6 py-2 rounded bg-indigo-300 hover:bg-indigo-100 cursor-pointer text-black
            // font-medium'>Login</Link>
      }
      </div>

      <button className='block md:hidden text-[17px] font-medium text-black' onClick={(e)=>{e.stopPropagation()
            setShowMenu(!showMenu)}}>
            {showMenu ? "X" : "☰"}
      </button>

      {/* for mobile screen */}
      {
            showMenu &&
            <nav className="absolute top-12 right-0 rounded-xl w-50 bg-gray-100 flex flex-col items-center 
            gap-4 py-5 shadow-md md:hidden" onClick={(e) => e.stopPropagation()}>
            <Link href="/" className={pathName === "/" ? "text-red-500 font-bold" : "text-black"} >Home</Link>
            <Link href="/cars" className={pathName === "/cars" ? "text-red-500 font-bold" : "text-black"} >Cars</Link>
            <Link href="/about-us" className={pathName === "/about-us" ? "text-red-500 font-bold" : "text-black"} >About us</Link>
            <Link href="/contact-us" className={pathName === "/contact-us" ? "text-red-500 font-bold" : "text-black"} >Contact us</Link>
            {
            session ?
            <>
            <Link href="/my-profile" className={pathName === "/my-profile" ? "text-red-500 font-bold" : "text-black"} >My Profile</Link> 
            <Button onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</Button>
            </>
            :
            <Button onClick={()=>router.push("/sign-in")}>Login</Button>
            }
            </nav>
      }
    </div>
    </div>
  )
}

export default Navbar