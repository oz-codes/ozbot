exports.name = "acl-get";
exports.about = ":acl-set <user>: check ACL of <user>"
exports.action = async function(client, message, args) {
		console.log("[ACL-GET] acl-Get called");
		level = await client.getACL(message,args[0]);
		message.reply(`ACL: ${level}`)
};
