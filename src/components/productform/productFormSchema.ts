// components/product-form/product-form-schema.ts
import * as z from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(5, "Product name must be at least 5 characters.")
    .max(100, "Product name must be at most 100 characters."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 500 characters."),

  computerSpec: z.object({
    processor: z.string().min(1, "Processor is required"),
    ram: z.string().min(1, "RAM is required"),
    storage: z.string().min(1, "Storage is required"),
    gpu: z.string().min(1, "GPU is required"),
    os: z.string().min(1, "OS is required"),
    screenSize: z.string().min(1, "Screen size is required"),
    battery: z.string().min(1, "Battery is required"),
  }),

  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
  priceIn: z.number().min(0, "Price cannot be negative"),
  priceOut: z.number().min(0, "Price cannot be negative"),
  discount: z.number().min(0).max(100),

  warranty: z.string().optional(),
  availability: z.boolean(),

  categoryUuid: z.string().min(1, "Category is required"),
  supplierUuid: z.string().min(1, "Supplier is required"),
  brandUuid: z.string().min(1, "Brand is required"),

  thumbnail: z.string().url("Please enter a valid URL").optional(),

  color: z.array(
    z.object({
      color: z.string().min(1, "Color name is required"),
      images: z.array(z.string()),
    })
  ),

  images: z.array(z.string()),
});

// Use this type
export type ProductForm = z.infer<typeof productFormSchema>;