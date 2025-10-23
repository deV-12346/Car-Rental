"use client"
import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const AdminHeader = () => {
      const {data:session} = useSession()
      const user:User = session?.user  as User
  return (
    <div className='w-full h-20 flex justify-evenly items-center'>
      <h1 className='text-black font-mono text-xl md:text-2xl'>Hello {user?.username}</h1>
      <button className='px-6 py-3 bg-indigo-200 rounded text-black font-medium hover:bg-indigo-100 cursor-pointer
      'onClick={()=>signOut({callbackUrl:"/sign-in"})}>Logout</button>
    </div>
  )
}

export default AdminHeader