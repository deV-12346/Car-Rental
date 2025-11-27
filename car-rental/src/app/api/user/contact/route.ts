import { connectDb } from "@/libs/connectDb";
import { contactModel } from "@/model/contactus.model";
import { contactValidation } from "@/schema/contact";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
      await connectDb()
      try {
            const body = await req.json()
            const result = await contactValidation.safeParseAsync(body)
            if(!result.success){
                  return NextResponse.json({
                  success:false,
                  message:result.error.issues[0].message
            },{status:400}) 
            }
            const newContact = new contactModel(result.data)
            await newContact.save()
            return NextResponse.json({
                  success:true,
                  message:"Your message has been sent successfully. Our team will get back to you shortly."
            },{status:201})
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  success:false,
                  message:"Something went wrong"
            },{status:500})
      }     
}