const express = require("express");

const router = express.Router();


router.get("/greeting",function(req,res) {
	console.log(req.session.passport.user.user);
	return res.status(200).json({"Message":"Hello "+req.session.passport.user.user})
})

module.exports = router;