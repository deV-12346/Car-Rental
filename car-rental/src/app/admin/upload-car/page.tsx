"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, UploadIcon } from "lucide-react";
import { uploadCarSchema } from "@/schema/uploadCar";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";
import { Label } from "@/components/ui/label";


const UploadCarForm = () => {
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const form = useForm({
    resolver: zodResolver(uploadCarSchema),
    defaultValues: {
      brand: "",
      carNumber: "",
      carModel: 2022,
      type: "",
      seats: 5,
      fuelType: "Petrol",
      transmission: "Manual",
      pricePerDay: 1000,
      images: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof uploadCarSchema>) => {
    console.log(data)
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          Array.from(value).forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value.toString());
        }
      });
      console.log(formData)
      const response = await axios.post("/api/admin/upload-car", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        form.reset();
        setPreviewImages([])
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<[]>>
      toast.error(axiosError.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-red-400 mb-4">
        Upload a New Car
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 border rounded-xl p-6 shadow-sm"
        >
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter car brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Car Number */}
          <FormField
            control={form.control}
            name="carNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. HP01A1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Car Model */}
          <FormField
            control={form.control}
            name="carModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Model (Year)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 2022" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. SUV, Sedan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seats */}
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seats</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fuel Type */}
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transmission */}
          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Per Day */}
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Day (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 2500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Images (min 3)</FormLabel>
                <FormControl>
                  {/* Hidden file input */}
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (!e.target.files) return;
                        const newFiles = Array.from(e.target.files);
                        const currentFiles = form.getValues("images") || [];
                        const updatedFiles = [...currentFiles, ...newFiles];
                        field.onChange(updatedFiles);

                        setPreviewImages((prev) => [
                          ...prev,
                          ...newFiles.map((file) => URL.createObjectURL(file)),
                        ]);

                        e.target.value = ""; // Reset input
                      }}
                      className="hidden"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer w-12 h-12 flex items-center justify-center border rounded-md hover:bg-gray-100"
                    >
                      <UploadIcon className="w-6 h-6 text-gray-500" />
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <Image
                  src={src}
                  alt={`preview-${idx}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover rounded-md border"
                />
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Remove preview
                    const newPreview = previewImages.filter((_, i) => i !== idx);
                    setPreviewImages(newPreview);

                    // Remove from form state (images)
                    const currentFiles = form.getValues("images") || [];
                    const updatedFiles = currentFiles.filter((_, i) => i !== idx);
                    form.setValue("images", updatedFiles);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload Car
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadCarForm;
