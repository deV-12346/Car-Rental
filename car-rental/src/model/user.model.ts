import mongoose, {Schema,model,models,Document} from "mongoose"

export interface User extends Document{
      username:string;
      email:string;
      password?:string;
      coverImage?:string;
      otp?:number;
      otpExpiryTime?:Date;
      isVerified:boolean;
      provider:"Custom"|"Google"
      role:"User"|"Admin";
      createdAt:Date;
}
const userSchema:Schema<User> = new Schema({
     username:{
      type:String,
      required:[true,"Username is required"],
      trim:true,
     },
     email:{
      type:String,
      required:[true,"Email is required"],
      trim:true,
      unique:true
     },
     password:{
      type:String,
     },
     coverImage:{ 
      type:String 
      },
     otp:{
      type:Number
     },
     otpExpiryTime:{
      type:Date
     },
     provider:{
      type:String,
      enum:["Custom","Google"],
      default:"Custom"
     },
     isVerified :{
      type:Boolean,
      default:false,
      required:true
     },
     role:{
      type:String,
      enum:["User","Admin"],
      default:"User", 
      required:true
     },
     createdAt:{
      type:Date,
      default:Date.now
     }
})
export const UserModel = models.User as mongoose.Model<User> || model<User>("User",userSchema)