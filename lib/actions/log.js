const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
const target = "log"
exports.log = async function log(message) {
	//get attributes of message
	sender = message.author.username
	body = message.content
	server = message.channel.guild.name 
	room = message.channel.name
	//build connection to mongo
	try {
		client = await MongoClient.connect(url)
		const db = client.db(target)
		let msg = {
			sender: sender,
			body: body,
			server: server,
			room: room
		};
		console.log("[LOG] logging following info...")
		console.info(msg)
		let logResult = await db.collection("discord").insertOne(msg);
	} catch (err) {
		console.log(err.stack);
	}
}


