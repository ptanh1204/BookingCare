import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();

let app = express();
// app.use(cors({ origin: true }));
// const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors({ credentials: true, origin: true }));
//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({ limit: '64mb' }));
app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }))
viewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})