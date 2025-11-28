import z from "zod";
export const caravailableschema = z.object({
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime()
})