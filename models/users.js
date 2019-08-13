const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

userSchema.methods.encrypPass = async (password) => {
   try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        return hash;
   } catch (e) {
        console.log(e)
   }
};

userSchema.methods.matchPass = async function(password) {
    return await bcrypt.compare(password, this.password);  
};

module.exports = mongoose.model('User', userSchema);