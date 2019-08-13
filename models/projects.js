const mongoose = require('mongoose');
const Schema = mongoose.Schema;

projectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required:true}
})

module.exports = mongoose.model('Project', projectSchema);