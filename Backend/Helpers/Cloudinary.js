import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    
    if (!localFilePath) {
      console.error('No file path provided');
      return null;
    }
    
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: 'sandesh',
      resource_type: 'auto',
      width: 250,
      height: 250,
      gravity: 'faces',
      crop: 'fill'
    });

    // File has been uploaded successfully
    console.log('File is uploaded on Cloudinary', response.url);

    // Remove the locally saved temporary file using fs.rm
    await fs.rm(localFilePath);
    console.log('Local file removed:', localFilePath);

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);

    // Attempt to remove the locally saved temporary file
    try {
      if (await fs.stat(localFilePath)) {
        await fs.rm(localFilePath);
        console.log('Local file removed after error:', localFilePath);
      }
    } catch (unlinkError) {
      console.error('Error removing local file:', unlinkError);
    }

    return null;
  }
};

export default uploadOnCloudinary ;