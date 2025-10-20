import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
      connectDb()
      const session = await getServerSession()
      const user:User = session?.user as User
      if(!user || user.role !=="Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized Access"
            },{status:401})
      }
      try {
           const cars = await CarModel.find()
           if(!cars || cars.length===0){
            return NextResponse.json({
                  success:false,
                  message:"No car found"
            },{status:404})
           } 
           return NextResponse.json({
                  success:true,
                  data:cars
            },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}