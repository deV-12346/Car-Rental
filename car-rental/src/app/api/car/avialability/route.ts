import { connectDb } from "@/libs/connectDb";
import { BookingModel } from "@/model/booking.model";
import { CarModel } from "@/model/car.model";
import { caravailableschema } from "@/schema/caravailableschema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
      await connectDb()
      try {
            const {carId,startDateTime,endDateTime} = await req.json()
            const result = await caravailableschema.safeDecodeAsync({startDateTime,endDateTime}) 
            if(!result.success){
                  return NextResponse.json({
                        success:false,
                        message:result.error.issues[0].message
                  },{status:400})
            }
            const start = new Date(startDateTime);
            const end = new Date(endDateTime);
            const alredayBooked = await BookingModel.findOne({
                  carId,
                  startDate:{$lt: end},
                  endDate:{$gt: start}
            })
            if(alredayBooked){
                  return NextResponse.json({
                        success:false,
                        message:"Car is not available on this this try with different Date and Time"
                  },{status:409})
            }else{
                  const car = await CarModel.findOne({_id:carId})
                  if(!car){
                        return NextResponse.json({
                              success:false,
                              message:"Car not found"
                        })
                  }
                  // const days = Math.ceil(endDateTime - startDateTime)
                  // console.log(days)
                  const ms = end.getTime() - start.getTime();
                  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
                  const totalPrice = car?.pricePerDay*days
                  return NextResponse.json({
                        success:true,
                        message:"Car is available",
                        price:totalPrice
                  },{status:200})
            }
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:400})
      }
}