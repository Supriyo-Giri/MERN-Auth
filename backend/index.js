const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT =  process.env.PORT || 8080;

const app = express();
const userRoutes = require("./Routes/authRoutes");
require('dotenv').config();
require('./Models/db'); 

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT: ${PORT} ...`);
})
