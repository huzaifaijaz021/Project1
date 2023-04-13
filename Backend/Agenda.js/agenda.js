import Agenda from 'agenda';
import axios from 'axios';
import userInfo from '../Model/userDetails.js';

const { DATABASE_URL } = process.env;
const agenda = new Agenda({
    db: { address: DATABASE_URL, collection: 'UserDetails' },
});


//Agenda Define that show the data after 24 hourse repeatedly
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
                    //If User Email  is already exist then update the User Entry
                    const { email: Email, name: Name, username: Username, address: { city: City }, phone: Phone, website: Website, company: { name: CompanyName } } = item;
                    const newData = await userInfo.updateOne({ email: Email }, {
                        name: Name,
                        username: Username,
                        address: City,
                        phone: Phone,
                        website: Website,
                        company: CompanyName
                    });

                    console.log("Updated Data Successfully ")
                    //If New User Enter then Create the User Entry
                } else {
                    const { name, username, email, address, phone, website, company } = data[i];
                    const newUser = new userInfo({
                        name,
                        username,
                        email,
                        address: address.city,
                        phone,
                        website,
                        company: company.name
                    });

                    const savedUser = await newUser.save();

                    console.log("Created data Successfully")
                }
            }
        }
        console.log('Posts saved successfully');
    } catch (err) {
        console.log(err);
    }
});

//Agenda is calling
const startAgenda = async () => {
    console.log("agenda is started")
    await agenda.start();
    await agenda.every('*/1 * * * *', 'show');
    // await agenda.every('24 hours', 'show');
};

export default startAgenda;