import { connectDb } from "@/libs/connectDb";
import { UserModel } from "@/model/user.model";
import { verifyOtp } from "@/schema/verifyotp";
import { NextResponse } from "next/server";

export async function POST(req:Request){
      await connectDb()
      try {
            const {email,otp} = await req.json()
            console.log(email)
            const result = verifyOtp.safeParse({otp})
            if(result.error){
                  return NextResponse.json({
                        success:false,
                        message:result.error.issues[0].message
                  },{status:400})
            }
            const user = await UserModel.findOne({email})
            if(!user){
                  return NextResponse.json({
                        success:false,
                        message:"User not found"
                  },{status:400})
            }
            const now = new Date()
            if(!user.otpExpiryTime || now > user.otpExpiryTime){
                  return NextResponse.json({
                        success:false,
                        message:"OTP Expired"
                  },{status:400})
            }
            if(Number(otp) !== user.otp){
                 return NextResponse.json({
                        success:false,
                        message:"Invalid OTP"
                  },{status:400}) 
            }
            user.isVerified = true
            user.otp = undefined;
            user.otpExpiryTime = undefined;
            await user.save()
            return NextResponse.json({
                        success:true,
                        message:"Account registered successfully",
                        data:user
                  },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}