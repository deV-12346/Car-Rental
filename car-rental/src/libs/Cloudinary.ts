import { Buffer } from "buffer";
import {v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
export interface CloudinaryUploadResult{
      public_id:string;
      secure_url: string;
}
export const uploadOncloudinary = async(file : File):Promise<CloudinaryUploadResult> =>{
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      return new Promise<CloudinaryUploadResult>
           ((resolve,reject)=>{
            const uploadStream = cloudinary.uploader.upload_stream(
                  {
                  folder:"next-clodinary-uploader",
                  },
                  (error,result)=>{
                  if(error) reject(error)
                  else resolve({public_id:result!.public_id,secure_url:result!.secure_url})
                  }
            )
            uploadStream.end(buffer)
            }
      )
} 
