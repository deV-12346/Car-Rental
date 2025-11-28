import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
      await connectDb()
      try {
            const carId = req.nextUrl.pathname.split("/").pop()
            console.log(carId)
            const car = await CarModel.findOne({_id:carId})
            if(!car){
                  return NextResponse.json({
                        success:false,
                        message:"Car not found"
                  },{status:404})
            }
            return NextResponse.json({
                  success:true,
                  message:"Car found",
                  data:car
            },{status:200})
      } catch (error) {
         console.log(error)
         return NextResponse.json({
            success:false,
            message:"Something went wrong"
         },{status:500})   
      }
}