import cloudinary from "../config/clound.config";

export const uploadCloudinary = (file: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
       const upload = cloudinary.uploader.upload_stream(
        {
            folder,
            resource_type: "image"
        },
        (err, result) => {
            if (err) reject(err);

            const version = `v${result!.version}`               // lấy v12345...
            const path = `/${version}/${result!.public_id}.${result!.format}`;      // lấy phần đuổi của url ảnh : /folder/....

            resolve(path);
        }
       )

       upload.end(file);
    })
}