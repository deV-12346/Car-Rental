import mongoose, { Document,models,Schema,model, Types} from "mongoose";

export interface Booking extends Document{
      userId:Types.ObjectId;
      carId:Types.ObjectId;
      startDate:Date;
      endDate:Date;
      totalPrice:number;
      status:"Booked"|"Completed"|"Cancelled"
}
const bookingSchema:Schema<Booking> = new Schema({
      userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
      },
      carId:{
            type:Schema.Types.ObjectId,
            ref:"Car",
            required:true
      },
      startDate:{
            type:Date,
            required:true
      },
      endDate:{
            type:Date,
            required:true
      },
      totalPrice:{
            type:Number,
            required:true
      },
      status:{
            type:String,
            enum:["Booked","Completed","Cancelled"],
            default:"Booked"
      }
},{timestamps:true})
export const BookingModel = models.Booking as mongoose.Model<Booking> || model<Booking>("Booking",bookingSchema)