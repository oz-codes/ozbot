var wolfram = require("wolfram-alpha").createClient("WXK4X7-ATQRYP3EW5");
var util = require("util")
exports.name = "wolf"
exports.about = ":wolf <query> - query wolfram|alpha"
exports.action = async function(client, message, args) {
    console.log("[WOLF] got query: %s", args)
    var res = await wolfram.query(args)
    console.log(util.inspect(res, {depth: 32}));
    message.channel.sendMessage(res)
    //message.channel.sendMessage("Just a moment!").then((msg) => {
    //	msg.edit("Pong! " + (msg.createdTimestamp - message.createdTimestamp) + " ms");
   // }).catch(console.error);
}
