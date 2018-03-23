var fs = require("fs")
const https = require('https')
exports.ACLCHECK = true;
exports.ACLLevel = 4;
exports.name = "addcommand";
exports.about = ":addcommand <url> <name> - adds a new command to the existing commands"
exports.action = (client, message, args) => {
	url = args[0];
	name = args[1];
	https.get(url, (resp) => {
		let data = "";
		resp.on('data', (chunk) => { data += chunk; })
		resp.on("end", () => {
			fs.writeFile(`commands/${name}.js`)
		})
		client.commands[name] = require(`commands/${name}.js`)
		message.reply(`The command ${args[0]} has been added.`).catch(console.error);
	})
};
