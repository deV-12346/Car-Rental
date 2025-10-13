import z from "zod"
export const verifyOtp = z.object({
      email:z.string().email("Invalid Email"),
      otp:z.number()
      .min(100000, "OTP must be 6 digits")
      .max(999999, "OTP must be 6 digits")
})