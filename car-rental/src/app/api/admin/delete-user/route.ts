import { connectDb } from "@/libs/connectDb";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";
import { UserModel } from "@/model/user.model";

export async function DELETE(req:NextRequest) {
      await connectDb()
      const session = await getServerSession(authOptions)
      const user:User = session?.user as User
      if(!user || user.role !=="Admin"){
            return NextResponse.json({
                  success:false,
                  message:"Unauthorized Access"
            },{status:401})
      }
      const {searchParams} = new URL(req.url)
      const id = searchParams.get("id")
      console.log(id)
      if (!id) {
      return NextResponse.json({ 
             success: false,
             message: "User Id is required"
            },{ status: 400 });
      }
      try {
           const user = await UserModel.findByIdAndDelete(id)
           console.log(user)
           return NextResponse.json({
                success:true,
                message:"User Deleted"
           },{status:200})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                success:false,
                message:"Something went wrong"
           },{status:500})
      }
}