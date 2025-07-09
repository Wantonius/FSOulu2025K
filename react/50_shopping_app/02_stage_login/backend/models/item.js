const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	type:String,
	count:Number,
	price:Number,
	user:{type:String,index:true}
})

Schema.virtual("id").get(function() {
	return this._id;
}) 

module.exports = mongoose.model("item",Schema);