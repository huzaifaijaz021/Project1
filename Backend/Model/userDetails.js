import mongoose from 'mongoose';

//create a  schema of Database
const Schema = mongoose.Schema;
const userData = new Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    address: String,
    phone: String,
    website: String,
    company: String
}, { timestamps: true });


// Export function to create "SomeModel" model class 
//Create  a Model of Database
const userInfo = mongoose.model("UserDetails", userData);
export default userInfo;

