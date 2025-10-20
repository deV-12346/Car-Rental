import { connectDb } from "@/libs/connectDb";
import { BookingModel } from "@/model/booking.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
      await connectDb()
      const session = await getServerSession()
      const user:User = session?.user as User
      if(!user || user.role !=="Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized Access"
            },{status:401})
      }
      try {
           const bookings = await BookingModel.aggregate([
                  {
                  $lookup:{
                        from:"users",
                        localField:"userId",
                        foreignField:"_id",
                        as:"UserDetails"
                  }
                  },
                  {$unwind:"$UserDetails"},
                  {
                  $lookup:{
                        from:"cars",
                        localField:"carId",
                        foreignField:"_id",
                        as:"CarDetails"
                  }
                  },
                  {$unwind:"$CarDetails"},
                  {$project:{
                        startDate:1,
                        endDate:1,
                        totalPrice:1,
                        status:1,
                        "UserDetails.username":1,
                        "UserDetails.email":1,
                        "CarDetails.carNumber":1,
                        "CarDetails.model":1,
                        "CarDetails.brand":1,
                  }}
           ])
           if(!bookings || bookings.length===0){
            return NextResponse.json({
                  success:false,
                  message:"Booking not found"
            },{status:404})
            }
            return NextResponse.json({
                  success:true,
                  data:bookings
            },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}