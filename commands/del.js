exports.name = "del"
exports.about = ":del <#>: deletes last # messages"
exports.action = async function(client, message, args) {
	message.channel.fetchMessages({limit: args[0]}).then( (messages) => {
		message.channel.bulkDelete(messages)
	})
}
