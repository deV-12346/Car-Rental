"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>AdminDashboard
      <button onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</button>
    </div>
  )
}

export default AdminDashboard