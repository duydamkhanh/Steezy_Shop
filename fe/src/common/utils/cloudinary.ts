import axios from "axios";
import { message } from "antd";

// const { CLOUD_NAME, UPLOAD_PRESET } = import.meta.env;

const uploadImage = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'steezy_shop');

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/phmvu2912/image/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        // message.success(`${file.name} uploaded successfully`);
        console.log('File uploaded successfully:', response.data);
        // onSuccess(response.data);
        return response.data.secure_url;
    } catch (error) {
        // message.error(`${file.name} upload failed.`);
        console.error('Upload failed:', error);
        onError(error);
    }
}

export { uploadImage }
