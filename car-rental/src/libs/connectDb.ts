import mongoose from "mongoose"
type connectionObjectProps = {
      isConnected?:number
}
const connection : connectionObjectProps = {}
export const connectDb = async():Promise<void> =>{
      if(connection.isConnected){
            console.log("MongoDB already connected")
            return
      }
      try{
         const db = await mongoose.connect(process.env.MONGO_URI as string)
         connection.isConnected = db.connections[0].readyState
         console.log("MongoDB connected successfully")
      }catch(err){
         console.log("MongoDB connection failed",err)
         process.exit(1)
      }
}