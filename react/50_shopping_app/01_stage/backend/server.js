const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url= "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/shopdatabase?retryWrites=true&w=majority"

mongoose.connect(url).then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect to mongodb. Reason:",err)
)

console.log("Running in port 3000");

app.listen(3000);