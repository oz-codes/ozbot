var fs = require("fs")
var paste = require("better-pastebin")
const https = require('https')
exports.ACLCHECK = true;
exports.ACLLevel = 4;
exports.name = "source";
exports.about = ":source <cmd> - get source for a command" 
paste.setDevKey("c22bf0b6f942a1fffaf0eca025ee3335")
exports.action = (client, message, args) => {
	target = args[0]
	fs.readFile(`commands/${target}.js`, 'utf8', (err, data) => { 
		if(err) {
			message.reply("error reading source")
		} else {
			paste.create({
				contents: data,
				name: "ozbot::source("+target+")"
			}, (success, data) => {
				message.reply(data)
			})
		}
	})
}
