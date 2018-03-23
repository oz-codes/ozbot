const https = require('https')
exports.name = "cmds";
exports.about = ":cmds - show list of cmds"
exports.action = (client, message, args) => {
		msg = "```"
		Object.keys(client.commands).map((name) => {
			cmd = client.commands[name]
			console.log("[CMDS]",cmd);
			msg += cmd.about + "\n"
		})
		msg += "````"
		message.reply(msg)
}
