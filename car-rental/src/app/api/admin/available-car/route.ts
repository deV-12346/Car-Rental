import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function PATCH(req:NextRequest) {
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
            const {carId,available} = await req.json()
            const car = await CarModel.findByIdAndUpdate(
                  carId,
                  {
                        available:available
                  },
                  {new:true}
            )
            if(!car){
                  return NextResponse.json({
                        success:false,
                        message:"Car not found"
                  },{status:404})
            }
            return NextResponse.json({
                  success:true,
                  message:"Car Availablity Updated"
            },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  messsage:"Somthing went wrong"
            },{status:500})
      }
}