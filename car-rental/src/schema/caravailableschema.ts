import z from "zod";
export const caravailableschema = z.object({
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime()
}).refine((data) => {
  return new Date(data.endDateTime) >= new Date(data.startDateTime);
}, {
  message: "End date must be equal to or greater than start date",
  path: ["endDateTime"], 
});