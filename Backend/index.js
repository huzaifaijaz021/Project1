import "dotenv/config.js"
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import setupDatabase from './Config/database.js';
import router from './Route/route.js'
import startAgenda from './Agenda.js/agenda.js'

const port = 4000;

app.use(express.json());
app.use(cors());

setupDatabase()
startAgenda()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.use('*', (req, res) => {
    res.json('page is not found');
    console.log("Not Found");
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});