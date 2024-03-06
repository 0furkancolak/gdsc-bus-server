const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv").config()
const app = express()
const route = require("./routes/router")

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", route)

app.listen(process.env.PORT, () => {
    require("./db/db")()
    console.log(`Server ${process.env.PORT} portunda çalışıyor`);
});