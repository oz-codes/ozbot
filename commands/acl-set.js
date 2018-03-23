exports.ACLCHECK = true;
exports.ACLLevel = 4;
exports.name = "acl-set";
exports.about = ":acl-set <user> <level>: set ACL at <level> for <user>"
exports.action = (client, message, args) => {
		console.log("[ACL-SET] acl-set called");
		if(client.setACL(message,args[0],args[1])) {
			message.reply("acl set.")
		} else {
			message.reply("unable to set acl")
		}
};
