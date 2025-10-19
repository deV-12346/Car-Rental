"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'

const NavbarWrapper = () => {
      const pathName = usePathname()
      const url = !pathName.startsWith("/sign-in") &&
      !pathName.startsWith("/sign-up") &&
      !pathName.startsWith("/verify-email")
  return (
    <div>{url && <Navbar/>}</div>
  )
}

export default NavbarWrapper