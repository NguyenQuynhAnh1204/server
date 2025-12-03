import cloudinary from "../infrastructure/config/clound.config";

export const deleteCloudinary = async (publicId: string) => {
    try {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    } catch (err) {
        throw err;
    }
};
