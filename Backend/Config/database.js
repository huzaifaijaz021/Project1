const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');


// const Database = () => {
// const {dbString}  != const dbString
const dbString = process.env.DATABASE_URL;

mongoose.connect(dbString);


const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.on('connected', () => {
    console.log('database is connected');
});
db.on('disconnect', () => {
    console.log('database is not connected');
});

// };

// module.exports = Database;
// module.exports = db