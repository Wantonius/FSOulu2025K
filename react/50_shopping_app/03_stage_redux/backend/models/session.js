const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	user:{type:String,index:true},
	ttl:Number,
	token:String
});

module.exports = mongoose.model("session",Schema);