exports.ACLCHECK = true;
exports.ACLLevel = 4
exports.about = ":reload <cmd>: reload command"
exports.name = "reload"
exports.action = (client, message, args) => {
    if (!args || args.size < 1) return message.channel.reply(`Correct Usage: reload [command name]`);

    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command ${args[0]} has been reloaded`).catch(console.error);
};
