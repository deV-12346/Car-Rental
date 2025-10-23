import { connectDb } from "@/libs/connectDb";
import { BookingModel } from "@/model/booking.model";
import { CarModel } from "@/model/car.model";
import { UserModel } from "@/model/user.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET() {
      await connectDb()
      const session = await getServerSession(authOptions)
      const user:User =  session?.user as User
      if(!user || user.role!=="Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized access"
            },{status:401})
      }
      try {
            const totalusers = await UserModel.countDocuments({
                  $and:[
                        {role:"User"},
                        {isVerified:true}
                  ]
            }) 
            const totalcars =  await CarModel.countDocuments()
            const bookings = await BookingModel.aggregate([
                  {
                  $group:{
                        _id:null,
                        totalBookings:{$sum:1},
                        totalRevenue:{$sum:"$totalPrice"}
                  }}
            ])
            const totalBooking = bookings[0]?.totalBookings || 0
            const totalRevenue = bookings[0]?.totalRevenue   || 0
            return NextResponse.json({
                  success:true,
                  data:{
                        totalusers,
                        totalcars,
                        totalBooking,
                        totalRevenue
                  }
            },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}