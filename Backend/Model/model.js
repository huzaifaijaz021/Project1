const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userData = new Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    address: String,
    phone: String,
    website: String,
    company: String
});


// Export function to create "SomeModel" model class
// userData.index({ "_id": 1 }, { unique: true });
const userInfo = mongoose.model("UserDetails", userData);
module.exports = userInfo;

