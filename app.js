async function ozbot() { //made async because Mongo
	const Discord = require("discord.js");
	const client = new Discord.Client();
	const MongoClient = require('mongodb').MongoClient
	const MongoUrl = "mongodb://localhost:27017"
	const C = require("./config/constants.js") //constants like ACL levels
	const assert = require("assert")
	const fs = require("fs");

	// Let's extend the client object with these.
	client.config = require("./config/config.json");
	client.commands = {}
	client.auto = require("./lib/actions.js") //auto actions on every message
	client.mongo = await MongoClient.connect(MongoUrl)
	client.getACL = async function getACL(msg,userid) { //get acl levels
		console.log("[CLIENT] getACL called")
		server = msg.channel.guild.name
		const db = client.mongo.db("perms")
		userid = userid.replace(/[<@!>]/g,'');
		const col = db.collection("ACL")
		res = await col.findOne({server: server, userid: userid})
		return res.level
	}
	client.setACL = async function setACL(msg,userid,level) {
		console.log("[MAIN] setACL called")
		server = msg.channel.guild.name
		userid = userid.replace(/[<@!>]/g,'');
		const db = client.mongo.db("perms")
		const col = db.collection("ACL")
		console.log(`[MAIN} setACL userid: ${userid}`) 
		res = await col.save({server: server, userid: userid, level: level})
		console.info(res);
		return res;
	}


	//test
	//
	fs.readdir("./commands/", (err, files) => { //autoload commands
	    if (err) return console.error(err);
	    files.forEach(file => {
		if(file.match(/\.swp/)) { return; }
		let cmd = require(`./commands/${file}`); //get code from command
		let cmdName = cmd.name 
		client.commands[cmdName] = cmd.action
		client.commands[cmdName].about = cmd.about 
	    });
	});
	fs.readdir("./events/", (err, files) => {
	    if (err) return console.error(err);
	    files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	    });
	});

	client.on("message", message => {
	    client.auto.bgtasks(message) 
	    if (message.author.bot) return;
	    if (!message.content.startsWith(client.config.prefix)) return;
	   
	    let command = message.content.split(" ")[0];
	    command = command.slice(client.config.prefix.length);
	    let args = message.content.split(" ").slice(1);

	    if (!client.commands[command]) {
		return;
	    }
	    if(client.commands[command].ACLCHECK && client.getACL(message) <= client.commands[command].ACLLevel) {
		    return;
	    }
	    try {
		client.commands[command](client, message, args);
	    } catch (err) {
		console.error(err);
	    }
	});

	client.login(client.config.token);
}
ozbot();
