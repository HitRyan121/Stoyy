const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.reply("Connect to a voice channel");

    if (!message.guild.me.voice.channel) return message.channel.send("Sorry, the bot is not connected.");

    if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("Sorry you are not connected to the same channel.");

    message.guild.me.voice.channel.leave();

}

module.exports.help = {
    name: "leave",
    description: "Leave the channel",
    category: "Music"
}