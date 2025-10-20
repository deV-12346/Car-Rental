import { connectDb } from "@/libs/connectDb";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";
import { UserModel } from "@/model/user.model";

export async function GET() {
      await connectDb()
      const session = await getServerSession(authOptions)
      const user:User =  session?.user as User
      if(!user || user?.role !== "Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized access"
            },{status:401})
      }
      try {
           const users = await UserModel.find({
            $and:[
                  {role:"User"},
                  {isVerified:true}
            ]}).select("-password")
           const admins = await UserModel.find({role:"Admin"}).select("-password")
            if(!users || users.length === 0 ){
            return NextResponse.json({
                  success:false,
                  message:"Users not found"
            },{status:404})
            }
           return NextResponse.json({
              success:true,
              data:{users,admins}
           },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }
}