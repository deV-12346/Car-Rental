import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import { NextResponse } from "next/server";

export async function GET(){
      await connectDb()
      try {
            const cars = await CarModel.find()
            if(!cars){
                  return NextResponse.json({
                        success:true,
                        message:"Car not found"
                  },{status:404})
            }
            return NextResponse.json({
                  success:true,
                  data:cars
            })
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}