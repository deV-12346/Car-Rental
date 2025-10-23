import { connectDb } from "@/libs/connectDb";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";
import { CarModel } from "@/model/car.model";

export async function DELETE(req:NextRequest) {
      await connectDb()
      const session = await getServerSession(authOptions)
      const user:User = session?.user as User
      if(!user || user.role !=="Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized Access"
            },{status:401})
      }
      const {searchParams} = new URL(req.url)
      const carId = searchParams.get("id")
      try {
            const car = await CarModel.findByIdAndDelete(carId)
            if(!car){
                  return NextResponse.json({
                        success:false,
                        message:"Car not found"
                  },{status:404})
            }
            return NextResponse.json({
                        success:true,
                        message:"Car Deleted"
            },{status:200}) 
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Someting went wrong"
            },{status:500})
      }
}