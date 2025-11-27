import {z} from "zod"
export const contactValidation = z.object({
      name:z.string().min(4,"Name must be of  atleast 4 characters long")
      .max(10,"Name not more than 10 characters long"),
      email:z.email("Enter a valid email"),
      message:z.string().min(50,"Message must be of atleast 50 characters long")
      .max(1000,"Message not more than 1000 characters long")
})