import { connectDb } from "@/libs/connectDb";
import { BookingModel } from "@/model/booking.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET() {
      await connectDb()
      const session = await getServerSession(authOptions)
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
                        _id:1,
                        startDate:1,
                        endDate:1,
                        totalPrice:1,
                        status:1,
                        username: "$UserDetails.username",
                        email: "$UserDetails.email",
                        carNumber: "$CarDetails.carNumber",
                        model: "$CarDetails.model",
                        brand: "$CarDetails.brand",
                  }},
                  {$sort:{startDate:-1}}
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