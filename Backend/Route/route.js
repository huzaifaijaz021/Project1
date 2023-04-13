import express from 'express';
const router = express.Router();
import userInfo from '../Model/userDetails.js';

// const { DATABASE_URL } = process.env;
// const agenda = new Agenda({
//     db: { address: DATABASE_URL, collection: 'UserDetails' },
// });


// //Agenda Define that show the data after 24 hourse repeatedly
// agenda.define('show', async (job) => {
//     try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//         if (response.data) {
//             //how to manipulate an array
//             const data = response.data;
//             for (let i = 0; i < data.length; i++) {
//                 const user = await userInfo.findOne({ email: data[i].email })
//                 if (user) {
//                     const item = data[i];
//                     // Create a new instance of the Mongoose model with the data
//                     //If User Email  is already exist then update the User Entry
//                     const newData = await userInfo.updateOne
//                         ({ email: item.email }, {
//                             name: item.name,
//                             username: item.username,
//                             // email: item.email,
//                             address: item.address.city,
//                             phone: item.phone,
//                             website: item.website,
//                             company: item.company.name
//                         })
//                     console.log("Updated Data Successfully ")
//                     //If New User Enter then Create the User Entry
//                 } else {
//                     const item = data[i];
//                     const newUser = new userInfo({
//                         name: item.name,
//                         username: item.username,
//                         email: item.email,
//                         address: item.address.city,
//                         phone: item.phone,
//                         website: item.website,
//                         company: item.company.name
//                     })
//                     const savedUser = await newUser.save();
//                     console.log("Created data Successfully")
//                     // userInfo.updateOne({})
//                 }
//             }
//         }
//         console.log('Posts saved successfully');
//     } catch (err) {
//         console.log(err);
//     }
// });

// //Agenda is calling
// (async function () {
//     console.log("agenda is started")
//     await agenda.start();
//     await agenda.every('*/1 * * * *', 'show');
//     // await agenda.every('24 hours', 'show');
// }());

router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

//for get/show  the data from the database
router.get('/showdata', async (req, res) => {
    try {
        const data = await userInfo.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error); // Failure
    }
});

//Send Data from Frontend to Backend
router.post('/insert', async (req, res) => {

    try {
        const { name: Name, username: Username, email: Email, address: Address, phone: Phone, website: Website, company: Company } = req.body;

        const existingUsers = await userInfo.findOne({ email: Email });
        if (existingUsers) {
            const frontendData = await userInfo.updateOne({ email: Email }, {
                name: Name,
                username: Username,
                email: Email,
                address: Address,
                phone: Phone,
                website: Website,
                company: Company
            });
            console.log("Frontend data Updated");
            return res.status(200).json("Frontend Data Updated");

        }
        else {
            const formData = new userInfo({
                name: Name,
                username: Username,
                email: Email,
                address: Address,
                phone: Phone,
                website: Website,
                company: Company
            })
            const hello = await formData.save();
            console.log("Frontend Data Created");
            return res.status(200).json("Frontend Data Created");
        }
    } catch (err) {
        console.log(err)
    }
})
export default router;

