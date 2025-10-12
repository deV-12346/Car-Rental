import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/libs/resend";
import { VerificationEmail } from "@/components/VerificationMail";
export const sendMailVerification = async(username:string,email:string,otp:number,otpExpiryTime:string)
:Promise<ApiResponse<void>> =>{
       try{
          await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Car Rental verification code",
            react: VerificationEmail({username,otp,otpExpiryTime})
          })
          return {
            success:true,
            message:"Verification Email Sent successfully"
          }
      }catch(err){
          console.log("Error while sending email",err)
          return {
            success:false,
            message:"Failed to send EMAIL"
          }
      }
}