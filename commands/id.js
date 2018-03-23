exports.name = "id"
exports.about = ":id: get userid"
exports.action = async function(client, message, args) {
    message.channel.sendMessage(message.author.id)
}
