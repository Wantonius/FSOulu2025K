const express = require("express");
const mongoose = require("mongoose");
const shoppingroute = require("./routes/shoppingroute");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sessionModel = require("./models/session");

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

mongoose.set("toJSON",{virtuals:true});

//HELPER FUNCTIONS AND CONSTANTS

const ttl_diff = 3600000

createToken = () => {
	const token = crypto.randomBytes(64);
	return token.toString("hex");
}

//Middleware to check if the user is legal. Returns 403 if not.

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		const now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"});
			}).catch(function() {
				return res.status(403).json({"Message":"Forbidden"});
			})
		} else {
			session.ttl = now+ttl_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next();
			}).catch(function() {
				return next();
			})
		}
	}).catch(function() {
		return res.status(403).json({"Message":"Forbidden"});
	})
}

//LOGIN API

//register

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length <8) {
		return res.status(400).json({"Message":"Bad request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({"Message":"Internal server error"});
		}
		const user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save().then(function() {
			return res.status(200).json({"Message":"Register Success"});
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"});
			}
			return res.status(500).json({"Message":"Internal server error"});
		});
	})
})

//login

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length <8) {
		return res.status(400).json({"Message":"Bad request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				return res.status(500).json({"Message":"Internal server error"});
			}
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"});
			}
			const token = createToken();
			const now = Date.now();
			const session = new sessionModel({
				user:user.username,
				ttl:now+ttl_diff,
				token:token
			});
			session.save().then(function() {
				return res.status(200).json({"token":token});
			}).catch(function(err) {
				return res.status(500).json({"Message":"Internal server error"})
			});
		})
	}).catch(function(err) {
		return res.status(500).json({"Message":"Internal server error"})
	});
})

//logout

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message":"Not found"});
	}
	sessionModel.deleteOne({"token":req.headers.token}).then(function() {
		return res.status(200).json({"Message":"Logged out"});
	}).catch(function(err) {
		return res.status(500).json({"Message":"Internal server error"})
	})
});

app.use("/api",isUserLogged,shoppingroute);

console.log("Running in port 3000");

app.listen(3000);