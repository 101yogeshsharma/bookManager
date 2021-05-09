const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes/routes');
const cors = require('cors');

// dotenv.config();

// mongoose.connect(process.env.DATABASE, () => console.log("Database Connection Successfull"));
mongoose.connect("mongodb://localhost:27017/bookManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = new express();
app.use(cors());
app.use(express.json());
app.use('/bookManager', router);

app.listen(4000, () => console.log("server is running"));