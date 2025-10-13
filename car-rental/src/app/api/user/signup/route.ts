import { sendMailVerification } from "@/helpers/emailVerifcationMail";
import { connectDb } from "@/libs/connectDb";
import { UserModel } from "@/model/user.model";
import { signupSchema } from "@/schema/signupSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req:Request){
      await connectDb()
      try {
           const body = await req.json()
           const result = signupSchema.safeParse(body)
           if(!result.success){
                return NextResponse.json({
                  success:false,
                  message:result.error.issues[0].message
                },{status:400})
           }
          const {username,email,password} = result.data
          const existingUser = await UserModel.findOne({email:email})

          const otp = Math.floor(100000+Math.random()*900000)
          const otpExpiryTime = new Date(Date.now() + 60 * 1000);
          const hashedPassword = await bcrypt.hash(password,10) 
          
          if(existingUser && existingUser?.provider === "Custom"){
               if(!existingUser?.isVerified){
               const emailresponse = await sendMailVerification(existingUser.username,email,otp,otpExpiryTime.toLocaleString())
               existingUser.password = hashedPassword
               existingUser.otp = otp
               existingUser.otpExpiryTime = otpExpiryTime
               await existingUser.save()

               return NextResponse.json({
               success:true,
               message:emailresponse.message
               },{status:201})

               }else{
               return NextResponse.json({
               success:true,
               message:"User already exists"
          },{status:400})
          }
          }else{
               const emailresponse = await sendMailVerification(username,email,otp,otpExpiryTime.toLocaleString())
               const newUser = new UserModel({
                    username,
                    email,
                    password:hashedPassword,
                    otp,
                    otpExpiryTime
               })
               await newUser.save()

               return NextResponse.json({
               success:true,
               message:emailresponse.message
               },{status:201})  
          } 
      } catch (error) {
          console.log(error)
          return NextResponse.json({
               success:false,
               message:"Something went wrong"
          },{status:500}) 
      }
}