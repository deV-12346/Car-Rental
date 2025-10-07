import mongoose, { Document, model, models, Schema } from "mongoose";
export interface Car extends Document{
      brand:string;
      CarModel:number;
      type:string;
      seats:number;
      fuelType:"Diesel" | "Petrol";
      transmission:"Automatic"| "Manual";
      pricePerDay:number;
      images:Array<{url:string}>;
      available:boolean;
}
const carSchema:Schema<Car> = new Schema({
      brand:{
            type:String,
            required:true
      },
      CarModel:{
            type:Number,
            required:true
      },
      type:{
            type:String,
            required:true
      },
      seats:{
            type:Number,
            required:true
      },
      fuelType:{
            type:String,
            enum:["Diesel","Petrol"],
            default:"Petrol"
      },
      transmission:{
            type:String,
            enum:["Automatic","Manual"],
            default:"Manual"
      },
      images:[
            {
                  url:{type:String}           //cloudinary
            }
      ],
      available:{
            type:Boolean,
            default:true
      }
},{timestamps:true})
export const CarModel = models.Car as mongoose.Model<Car> || model<Car>("Car",carSchema)