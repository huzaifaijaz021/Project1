import mongoose from "mongoose";
const dbString = process.env.DATABASE_URL;
// console.log("🚀 ~ file: database.js:3 ~ dbString:", dbString)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);  // DeprecationWarning
const setupDatabase = () => {
    if (
        mongoose.connection.readyState !== 1 ||
        mongoose.connection.readyState !== 2
    ) {
        mongoose
            .connect(dbString, options)
            .then(() => {
                console.info("Connected to the Database");
            })
            .catch((err) =>
                console.log("ERROR - Unable to connect to the database:", err)
            );
    }
};
export default setupDatabase