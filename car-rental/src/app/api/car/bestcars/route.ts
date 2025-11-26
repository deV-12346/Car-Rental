import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import {  NextResponse } from "next/server";

export async function GET() {
      await connectDb()
      try {
          const bestcars = await CarModel.find().sort({ pricePerDay: -1 }).limit(5); 
          if(!bestcars){
            return NextResponse.json({
                  success:false,
                  message:"No car found"
            },{status:404})
          } 
            return NextResponse.json({
                  success:true,
                  message:"Cars found successfully",
                  data:bestcars
            },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}