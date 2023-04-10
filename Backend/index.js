const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

// require('./Route/route');
const router = require('./Route/route');
// const userInfo = require('./Model/model')  // if you want to access model here
// const database = require('./Config/database')
require('./Config/database');
const port = 4000;
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

//To access the database of User
// database();




// app.use('/api', (req, res) => {
//     res.json('Hello');
//     console.log('done');
// });



app.use('*', (req, res) => {
    res.json('page is not found');
    console.log("Not Found");
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});