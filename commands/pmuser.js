const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send("user not specified");

    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
    if (!member) return message.channel.send("use not found")

    var text = args.join(" ").slice(args[0].lenght + 1);
    if (!text) return message.channel.send("do not send a message");

    message.member.send(text).then(() => {
    }).catch(() => {
        message.channel.send(":x: The person has the DM off")

    });


}

module.exports.help = {
    name: "pm",
    description: "Pm people",
    category: "Admin"
}