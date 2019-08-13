const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(
    db => console.log('Init Database')
).catch(err=>console.log(err));

module.exports = mongoose;