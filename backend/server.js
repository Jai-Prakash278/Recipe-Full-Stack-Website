//External Modules
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//Internal Modules
const recipeRouter = require('./routes/recipeRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require("./config/connectionDB");

app.use(express.json());
app.use(cors());
app.use(express.static("public"))

app.use('/recipes', recipeRouter);
app.use('/', userRouter);

const PORT = process.env.PORT || 3000;
connectDB();


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})