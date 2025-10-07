import z from "zod";

export const uploadCarSchema = z.object({
  brand: z.string()
    .min(2, "Brand name too short")
    .max(15, "Brand name too long"),

  carModel: z.number()
    .min(2020, "Model year too old")  
    .max(new Date().getFullYear() + 1, "Model year too futuristic"),

  type: z.string()
    .min(2, "Car type too short")
    .max(20, "Car type too long"),

  seats: z.number()
    .min(1, "Seats must be at least 1")
    .max(20, "Seats too high"),

  fuelType: z.enum(["Diesel", "Petrol"]),
  transmission: z.enum(["Automatic", "Manual"]),

  pricePerDay: z.number()
    .min(1, "Price must be at least 1"),

  images: z.array(z.string().regex(/\.(jpg|jpeg|png)$/i, "Image must be PNG or JPG"))
});