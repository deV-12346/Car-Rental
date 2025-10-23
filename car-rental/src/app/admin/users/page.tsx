"use client"
import { Button } from '@/components/ui/button'
import { User } from '@/model/user.model'
import { ApiResponse,UsersResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import { Loader} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
const Users = () => {
      const [usersData,setUsersData] = useState<UsersResponse>({
            users:[],
            admins:[]
      })
      const [loading,setLoading] = useState(false)
      const fetchUsers = async()=>{
            setLoading(true)
      try {
            const res = await axios.get<ApiResponse<UsersResponse>>("/api/admin/getusers")
            if(res.data.success){
                 setUsersData(res.data.data || {users:[],admins:[]})
            }
      }
      catch (error) {
            const axiosError = error as AxiosError <ApiResponse<UsersResponse>>
            toast.error(axiosError.response?.data.message)
      }finally{
            setLoading(false)
      }
      }
      useEffect(()=>{
            fetchUsers()
      },[])
      console.log(usersData)
      const handleDelete = async(id:string)=>{
            try {
                  const response = await axios.delete(`/api/admin/delete-user?id=${id}`)
                  if(response.data.success){
                        toast.success(response.data.message)
                        fetchUsers()
                  }
            } catch (error) {
                  const axiosError = error as AxiosError
                  console.log(axiosError.message)
            }
      }
  return (
    <div className='flex flex-col justify-center items-center'>
    <h1 className='text-xl md:text-2xl text-gray-400 py-3 font-bold'>Available Users</h1>
      {
      loading ? 
      <Loader className='animate-spin'/>: 
     <div className="w-full  max-w-xs md:max-w-3xl text-left border border-gray-300 rounded-lg
      max-h-80 overflow-auto md:overflow-scroll  scroll mt-3">
     <table className="w-full">
      <thead className='bg-gray-50'>
            <tr className='text-center'>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Sr No</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Username</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Email</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Created at</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Action</th>
            </tr>
      </thead>
      <tbody>
            {
            usersData.users.map((user:User,index,)=>(
                  <tr key={user?._id?.toString() || index} className='text-center'>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{index+1}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{user?.username}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{user?.email}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{new Date(user?.createdAt).toLocaleDateString()}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>
                  <Button onClick={()=>handleDelete(user._id)}>Delete</Button>
                  </td>
                  </tr>
            ))
            }
      </tbody>
     </table>
    </div>
      }
    <h1 className='text-xl md:text-2xl text-gray-400 py-3 font-bold'>Available Admin</h1>
    {
      loading ? 
      <Loader className='animate-spin'/>: 
    <div className="w-full  max-w-xs md:max-w-3xl text-left border border-gray-300 rounded-lg
      max-h-80 overflow-auto md:overflow-scroll  mt-3">
     <table className="w-full">
      <thead className='bg-gray-50'>
            <tr className='text-center'>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Sr No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Adminname</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Email</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Created at</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Action</th>
            </tr>
      </thead>
      <tbody>
            {
            usersData.admins.map((admin:User,index,)=>(
                  <tr key={admin?._id?.toString() || index} className='text-center' >
                  <td className='border-b-2 py-2 px-3 md:px-10'>{index+1}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{admin?.username}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{admin?.email}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{new Date(admin?.createdAt).toLocaleDateString()}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>
                  <Button onClick={()=>handleDelete(admin._id)}>Delete</Button>
                  </td>
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

export default Users