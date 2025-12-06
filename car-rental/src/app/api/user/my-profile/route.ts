import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import { connectDb } from "@/libs/connectDb";
import { UserModel } from "@/model/user.model";
import { BookingModel } from "@/model/booking.model";

export async function GET(){
      const session = await getServerSession(authOptions)
      const user:User = session?.user as User
      if(!user){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized Request"
            })
      }
      await connectDb()
      try{
          const finduser = await UserModel.findById(user._id)
          if(!finduser){
                return NextResponse.json({
                  success:false,
                  message:"User not found"
                },{status:404})
          }
            const bookings = await BookingModel.find({ userId: user._id })
            .populate("carId") 
            .sort({ createdAt: -1 })
          return NextResponse.json({
               success:true,
               message:"User profile fetched",
               data:{
                  finduser,
                  bookings
               }
          },{status:200})
      }catch(error){
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}