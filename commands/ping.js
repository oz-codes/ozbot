exports.name = "ping";
exports.about =":ping - measure ping time from bot"
exports.action = (client, message, args) => {
    message.channel.sendMessage("Just a moment!").then((msg) => {
    	msg.edit("Pong! " + (msg.createdTimestamp - message.createdTimestamp) + " ms");
    }).catch(console.error);
}
