import z from "zod"
export const loginSchema = z.object({
      identifier:z.string().min(1, "Email is required").email("Invalid Email"),
      password:z.string().min(6,"Password must of atleast 6 characters")
      .max(10,"Password not more than 10 characters long")
})