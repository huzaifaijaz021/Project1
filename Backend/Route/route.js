const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const Agenda = require('agenda');


const express = require('express');
const app = express();
const router = express.Router();


// Single routing

const userInfo = require('../Model/model');

const { DATABASE_URL } = process.env;
const agenda = new Agenda({
    db: { address: DATABASE_URL, collection: 'UserDetails' },
});

agenda.define('show', async (job) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response.data) {
            //how to manipulate an array
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                const user = await userInfo.findOne({ email: data[i].email })
                if (user) {
                    const item = data[i];
                    // Create a new instance of the Mongoose model with the data
                    const newData = await userInfo.updateOne
                        ({ email: item.email }, {
                            name: item.name,
                            username: item.username,
                            // email: item.email,
                            address: item.address.city,
                            phone: item.phone,
                            website: item.website,
                            company: item.company.name
                        })
                    console.log("Updated Data Successfully ")
                } else {
                    const item = data[i];
                    const newUser = new userInfo({
                        name: item.name,
                        username: item.username,
                        email: item.email,
                        address: item.address.city,
                        phone: item.phone,
                        website: item.website,
                        company: item.company.name
                    })
                    const savedUser = await newUser.save();
                    console.log("Created data Successfully")
                    // userInfo.updateOne({})
                }
            }
        }
        console.log('Posts saved successfully');
    } catch (err) {
        console.log(err);
    }
});


(async function () {
    console.log("agenda is started")
    await agenda.start();
    await agenda.every('*/1 * * * *', 'show');
    // await agenda.every('24 hours', 'show');
}());

router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

//for get the data from the database
router.get('/showdata', async (req, res) => {
    try {
        const data = await userInfo.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error); // Failure
    }
});


//To post the data from the database
router.post('/adddata', async (req, res) => {

    try {
        const existingUser = await userInfo.findOne({
            $or: [
                { name: req.body.name },
                { username: req.body.username },
                { email: req.body.email },
                { address: req.body.address },
                { phone: req.body.phone },
                { website: req.body.website },
                { company: req.body.company }
            ]
        });


        if (existingUser) {
            console.log('User Already Exist');
            return res.status(409).json({ message: 'User already exists.' });
        } else {
            const newUser = new userInfo({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                website: req.body.website,
                company: req.body.company
                // other user data fields
            });
            console.log("🚀 ~ file: route.js:133 ~ router.post ~ newUser:", newUser)

            // newUser.save();
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//To Take the Frontend of the Data
router.post('/insert', async (req, res) => {

    try {
        const Name = req.body.name
        const Username = req.body.username
        const Email = req.body.email
        const Address = req.body.address
        const Phone = req.body.phone
        const Website = req.body.website
        const Company = req.body.company

        const existingUsers = await userInfo.findOne({ email: Email });
        if (!existingUsers) {
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
            // await formData.save();
            console.log("Data is send from Frontend to Database");
            return res.status(201).json(hello);
            // res.send("inserted data..")
        }
        else {
            // return res.status(400).json({ error: 'Email is already taken' });
            console.log('Frontend Email already taken');
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;

