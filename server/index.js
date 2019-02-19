const express = require("express");
const app = express();
const port = process.env.PORT || 8800;

const server = app.listen(port, (err)=>{
	if(err){
		console.log(err);
		return false;
	}
	console.log(port+" is opened");
});

var io = require("socket.io")(server);

io.on("connection", (socket)=>{
	console.log(socket.id+" connected");
	
	socket.on("mySticker", (data)=>{
		io.emit("sticker_on", data);
	})
});