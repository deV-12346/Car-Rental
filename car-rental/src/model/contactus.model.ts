import  { Document, Model, model, models, Schema } from "mongoose";
interface Contact extends Document{
      name:string;
      email:string
      message:string
}
const contactSchema:Schema<Contact> = new Schema({
      name:{
            type:String,
            required:true,
            trim:true
      },
      email:{
            type:String,
            required:true,
            trim:true
      },
      message:{
            type:String,
            required:true,
            trim:true,
      }
},{timestamps:true})
export const contactModel = models.ContactUs as Model<Contact> 
 || model<Contact>("ContactUs",contactSchema)