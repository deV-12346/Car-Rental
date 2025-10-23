"use client"
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Car } from '@/model/car.model'
import { ApiResponse } from '@/types/ApiResponse'
import axios,{ AxiosError }from 'axios'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Cars = () => {
  const [loading,setLoading] = useState(false)
  const [cars,setCars] = useState<Car[]>([])
  const fetchCars = async()=>{
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse<Car[]>>("/api/admin/getcars")
      if(response?.data?.success){
          setCars(response.data.data || [])
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
 
  const handleSwitchChange = async(carId:string,isAcceptingBooking:boolean)=>{
    console.log(carId,isAcceptingBooking)
    try {
      const response =  await axios.patch("/api/admin/available-car",{carId,available:!isAcceptingBooking})
      if(response.data.success){
        setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, available: !isAcceptingBooking } as Car : car
        )
      )
      toast.success(response.data.message)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<Car>>
      toast.error(axiosError?.response?.data.message || "Somethig went wrong")
    }
  }
  const handleDeleteCar = async(carId:string)=>{
    try {
      const response = await axios.delete<ApiResponse<[]>>(`/api/admin/delete-car?id=${carId}`)
      if(response.data.success){
        toast.success(response.data.message)
        fetchCars()
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<[]>>
      toast.error(axiosError.response?.data.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-center text-xl md:text-2xl font-bold text-red-400'>
      Available Cars</h1>
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
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Brand</th>
                  <th className='border-r-2 px-3 md:px-12 py-3 text-gray-600 font-medium'>Car No</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Model</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Type</th>
                  <th className='border-r-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Price Per Day</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Available</th>
                  <th className='border-l-2 px-3 md:px-8 py-3 text-gray-600 font-medium'>Action</th>
            </tr>
      </thead>
      <tbody>
            {
            cars.map((car:Car,index,)=>(
                  <tr key={car?._id?.toString() || index} className='text-center' >
                  <td className='border-b-2 py-2 px-3 md:px-10'>{index+1}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{car?.brand}</td>
                  <td className='border-b-2 py-2 px-3 md:px-12'>{car?.carNumber}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{car?.carModel}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{car?.type}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>{car?.pricePerDay}</td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>
                   <Switch
                      checked={car?.available}
                      onCheckedChange={() =>
                        handleSwitchChange(car?._id.toString(), car?.available)
                      }
                    />
                  </td>
                  <td className='border-b-2 py-2 px-3 md:px-10'>
                  <Button onClick={()=>handleDeleteCar(car?._id)}>Delete</Button>
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

export default Cars