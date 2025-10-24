import { uploadOncloudinary } from "@/libs/Cloudinary";
import { connectDb } from "@/libs/connectDb";
import { CarModel } from "@/model/car.model";
import { uploadCarSchema } from "@/schema/uploadCar";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";
export async function POST(req:NextRequest){
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
      const formData = await req.formData()
      const images = formData.getAll("images") as File[] 
      console.log(images)
      const brand = formData.get("brand") as string
      const carNumber = formData.get("carNumber") as string
      const carModel = Number(formData.get("carModel"))
      const type = formData.get("type") as string
      const seats = Number(formData.get("seats")) 
      const fuelType = formData.get("fuelType") as "Diesel" | "Petrol";
      const transmission = formData.get("transmission") as "Automatic"| "Manual"
      const pricePerDay = Number(formData.get("pricePerDay"))

      if(!images || images.length > 3){
            return NextResponse.json({
                  success:false,
                  message:"Car images must be atleast 3"
            },{status:400})
      }

      const validationData = {
      brand,
      carNumber,
      carModel,
      type,seats,
      fuelType,
      transmission,
      pricePerDay,
      images
      }
      const validationResult = uploadCarSchema.safeParse(validationData)
      if(validationResult.error){
            return NextResponse.json({
                  success:false,
                  message:validationResult.error.issues[0].message
            },{status:400})
      }
      const imgUrl :  { url: string }[]  = []
      for(const file of images){
            const result = await uploadOncloudinary(file)
            if(!result){
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong while uploading images"
            },{status:400})
            }
            imgUrl.push({ url: result.secure_url })
      }
      const newCar = new CarModel({
            brand,
            carNumber,
            carModel,
            type,
            seats,
            fuelType,
            transmission,
            pricePerDay,
            images:imgUrl,
            available:true,
      })
      await newCar.save()
      return NextResponse.json({
            success:true,
            message:"Car uploaded successfully",
            newCar
      },{status:201})
    } catch (error) {
      console.log(error)
           return NextResponse.json({
                  success:false,
                  message:"Something went wrong "
            },{status:500}) 
    }
}