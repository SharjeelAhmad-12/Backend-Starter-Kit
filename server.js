const express = require('express')
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");


const port = process.env.PORT || 5000

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json())


app.use((err, req, res, next) => {
    res.status(404).json({
        message: 'An error occured!',
        error: err.message
    })
})



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})