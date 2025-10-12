import z from "zod"
export const signupSchema = z.object({
      username:z.string().min(6,"Username must of atleast 6 characters")
      .max(10,"Username not more than 10 characters"),
      email:z.string().email("Invalid Email"),
      password:z.string().min(6,"Password must of atleast 6 characters")
      .max(10,"Password not more than 10 characters long"),
})