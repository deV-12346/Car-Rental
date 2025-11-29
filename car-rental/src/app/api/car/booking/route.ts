import { connectDb } from "@/libs/connectDb";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";
import { BookingModel } from "@/model/booking.model";

export async function POST(req:NextRequest){
      await connectDb()
      const session = await getServerSession(authOptions)
      const user:User = session?.user as User
      const userId = user._id
      if(!user || !userId){
            return NextResponse.json({
                  success:false,
                  message:"Please login first"
            },{status:401})
      }
      try {
            const {carId,startDate,endDate,totalprice} = await req.json()
            console.log(carId,startDate,endDate,totalprice)
            if(!carId){
                  return NextResponse.json({
                        success:false,
                        message:"User or Car not found"
                  },{status:404})
            }
            const carBooking = await BookingModel.create(
                  {
                        userId,
                        carId,
                        startDate,
                        endDate,
                        totalPrice:totalprice

                  }
            )
            console.log(carBooking)
            return NextResponse.json({
                  success:true,
                  message:"Booking Sucess"
            },{status:201})  
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            })
      }
}