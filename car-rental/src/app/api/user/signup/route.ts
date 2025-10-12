import { sendMailVerification } from "@/helpers/emailVerifcationMail";
import { connectDb } from "@/libs/connectDb";
import { UserModel } from "@/model/user.model";
import { signupSchema } from "@/schema/signupSchema";
import { NextResponse } from "next/server";


export async function POST(req:Request){
      await connectDb()
      try {
           const body = await req.json()
           const result = signupSchema.safeParse(body)
           if(result.error){
                return NextResponse.json({
                  success:false,
                  message:result.error.issues[0].message
                },{status:401})
           }
          const {username,email,password} = body
          const existingUser = await UserModel.findOne({email})
          if(existingUser?.provider === "Custom"){
               return NextResponse.json({
                    success:false,
                    message:"User already exists"
               },{status:400})
          } 
          const otp = Math.floor(100000+Math.random()*100000)
          const otpExpiryTime = new Date(Date.now() + 60 * 60 * 1000); 
          const newUser = new UserModel({
               username,
               password,
               email,
               otp,
               otpExpiryTime
          })
          await newUser.save()
          const emailresponse = await sendMailVerification(username,email,otp,otpExpiryTime.toLocaleString())
          return NextResponse.json({
               success:true,
               message:emailresponse.message
          },{status:201})
      } catch (error) {
          console.log(error)
          return NextResponse.json({
               success:false,
               message:"Something went wrong"
          },{status:500}) 
      }
}