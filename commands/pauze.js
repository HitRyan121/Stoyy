const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment. ");
    if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry you are not in the same channel");

    if (guildIDData.dispatcher.paused) return message.channel.send("The music has already paused.");

    guildIDData.dispatcher.pause();

    return message.channel.send("Paused successfully");

}

module.exports.help = {
    name: "pause",
    description: "Pause The music",
    category: "Music"
}