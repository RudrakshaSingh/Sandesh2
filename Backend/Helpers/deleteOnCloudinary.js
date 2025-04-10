import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteOnCloudinary = async (url) => {
  try {
    if (!url) {
      console.error('No URL provided for deletion');
      return null;
    }

    // Check if the URL is the default profile image URL
    if (url === process.env.DEFAULT_PROFILE_IMAGE_URL) {
      console.log('Default profile image URL, not deleting:', url);
      return null;
    }

    // Extract the public ID from the Cloudinary URL
    const parts = url.split('/').slice(7);  // Skip first 6 parts (https://res.cloudinary.com/...)
    const publicId = parts.join('/').split('.')[0];  // Join remaining parts and remove file extension

    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result === 'ok') {
      console.log('File successfully deleted from Cloudinary:', publicId);
    } else {
      console.error('Failed to delete file from Cloudinary:', response);
    }

    return response;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return null;
  }
};

export default deleteOnCloudinary;
