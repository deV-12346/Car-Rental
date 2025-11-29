"use client"

import {useEffect, useState} from "react"
import { ChevronDownIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Car } from "@/app/(app)/cars/[id]/page"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
interface Carprops{
      car:Car
}
type checkAvailabilityResponse = number;
export function CheckAvailability({car}:Carprops) {
  const [formOpen, setFormOpen] = useState(false)
  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date)
  const [endDate, setEndDate] = useState<Date>(() => {
  const d = new Date();   
  d.setDate(d.getDate() + 1); 
  return d;
  });
  const [startTime, setStartTime] = useState("10:30:00")
  const [endTime, setEndTime] =useState("10:30:00")
  const [loading,setLoading] = useState(false)
  const [isAvailable,setisAvailable] = useState(false)
  const [totalprice,setTotalPrice] = useState<number | null>(null)
  const [carResponse,setcarResponse] = useState<string | null>(null)
  const router = useRouter()
  const today = new Date()
  today.setHours(0, 0, 0, 0) 

  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 10)
  const carId = car._id
  const checkAvailability = async()=>{
      setLoading(true)
      const startDateTime = new Date(`${startDate?.toDateString()} ${startTime}`);
      const endDateTime = new Date(`${endDate?.toDateString()} ${endTime}`);
      try {
            const response = await axios.post<ApiResponse<checkAvailabilityResponse>>
            ("/api/car/avialability",{carId,startDateTime,endDateTime})
            if(response.data.success){
                  setisAvailable(response.data.success)
                  setTotalPrice(response.data?.data || null)
                  setcarResponse(response.data.message || null)
            }
      } catch (error) {
            const axiosError = error as AxiosError<ApiResponse<checkAvailabilityResponse>>
            setcarResponse(axiosError.response?.data.message || "Something went wrong")
      }finally{
            setLoading(false)
      }
  }
    useEffect(() => {
     if(!formOpen) {
     setisAvailable(false)
    setTotalPrice(null)
    setcarResponse(null)
      }
      }, [formOpen])

      useEffect(() => {
      if (formOpen) {
      setisAvailable(false)
      setTotalPrice(null)
      setcarResponse(null)
      }
  },[startDate, endDate, startTime, endTime,formOpen])
  useEffect(() => {
  if (startDate) {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setEndDate(nextDay);
  }
  }, [startDate]);
  const bookCar = async() =>{
      setLoading(true)
      try {
          const response = await axios.post<ApiResponse<[]>> ("/api/car/booking",{carId,startDate,endDate,totalprice}) 
          if(response.data.success){
          toast.success(response.data.message,{duration:15000})
          router.push("/my-profile")
          } 
      } catch (error) {
           const axiosError = error as AxiosError<ApiResponse<[]>> 
           toast.error(axiosError.response?.data.message,{duration:15000})
      }finally{
            setLoading(false)
      }
  }
  return (
     <Popover open={formOpen} onOpenChange={setFormOpen}>
      <PopoverTrigger asChild>
        <Button className="w-full py-2 md:py-8">Book Now</Button>
      </PopoverTrigger>
      <PopoverContent className="w-85 py-4">
      <div className="flex justify-center items-center my-2">
                    {isAvailable ? 
                     <p className="text-2xl md:text-3xl text-green-400 font-serif tracking-tight">
                        <span className="text-xl md:text-2xl ">Total Price : {" "}</span>
                        ₹ {totalprice}
                     </p> 
                    : 
                     <p className="text-2xl md:text-3xl font-extrabold text-indigo-600 tracking-tight">
                    ₹ {car.pricePerDay} {" "}
                     <span className="text-black text-xl md:text-2xl font-sans">per day</span>
                    </p>
                    } 

      </div>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col gap-3">
            <Label className="px-1">Start Date</Label>
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-32 justify-between font-normal">
                  {startDate ? startDate.toLocaleDateString() : "Select Date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  disabled={(date) =>
                    date < today || date > maxDate
                  }
                  onSelect={(date) => {
                    setStartDate(date)
                    setStartOpen(false)
                  }}
                 />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="px-1">Start Time</Label>
            <Input
              type="time"
              step="1"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <Label className="px-1">End Date</Label>
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-32 justify-between font-normal">
                  {endDate ? endDate.toLocaleDateString() : "Select Date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  disabled={(date) =>
                    date < today ||
                    date > maxDate ||
                    (startDate ? date < startDate : false)  
                  }
                  onSelect={(date) => {
                    setEndDate(date!)
                    setEndOpen(false)
                  }}/>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="px-1">End Time</Label>
            <Input
              type="time"
              step="1"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
       {isAvailable ?
            <Button onClick={()=>bookCar()} className="w-40" variant={"destructive"}>
                  {loading ?
                  <>
                  <Loader2 className="animate-spin"/>
                  </>
                  :
                  "Procced to Book"
                  }
            </Button>
             :
            <Button onClick={()=>checkAvailability()} className="w-40">
                  {loading ?
                  <>
                  <Loader2 className="animate-spin"/>
                  </>
                  :
                  "Check Availibility "
                  }
            </Button>
       }
        </div>
       <div className="text-center">
      {carResponse && (
      <p className={`font-serif flex justify-center items-center gap-2 ${
            carResponse === "Car is available"
                ? "text-green-400"
                : "text-red-400 text-md"
            }`}>
            {carResponse === "Car is available" ? (
              <CheckCircle size={20} />
            ) : (
              <XCircle size={20} />
            )}
            {carResponse}
          </p>
        )}
       </div>
      </PopoverContent>
    </Popover>
  )
}
