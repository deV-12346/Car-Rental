import z from "zod"
export const verifyOtp = z.object({
      otp:z.string().length(6,"Otp must be of 6 digits")  
})