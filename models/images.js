const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT
});

imageSchema = new Schema({
    imageURI: {type: String, required: true},
    projectId: Schema.Types.ObjectId,
    public_id: {type: String}
})

imageSchema.methods.cloudinarySave = (path) =>{
    return cloudinary.v2.uploader.upload(path);
};
imageSchema.methods.cloudinaryDestroy = async (id) => {
    try{
        return await cloudinary.v2.uploader.destroy(id);
    }catch(e){
        console.log(e);
    } 
};
module.exports = mongoose.model('Image', imageSchema);