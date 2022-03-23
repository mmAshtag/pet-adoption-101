const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'pet-adoptions101', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadToCloudinary = (path) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

exports.uploadToCloudinary = uploadToCloudinary