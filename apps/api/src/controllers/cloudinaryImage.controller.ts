import { protectedProcedure, router } from "../context.trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  // biome-ignore lint/style/useNamingConvention: <explanation>
  cloud_name: "dyvpwgeza",
  // biome-ignore lint/style/useNamingConvention: <explanation>
  api_key: process.env.CLOUDINART_API_KEY,
  // biome-ignore lint/style/useNamingConvention: <explanation>
  api_secret: process.env.CLOUDINART_SECRET,
});

export const CloudinaryImageController = router({
  uploadImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      console.info(input);
      if (input.includes("cloudinary")) {
        console.info(input);
        return input;
      }
      const uploadResult = await cloudinary.uploader.upload(input);
      console.info("uploadResult are here!!!");
      console.info(uploadResult.url);
      return uploadResult.url;
    }),
});
