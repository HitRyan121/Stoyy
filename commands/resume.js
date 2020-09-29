
module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment.");

    if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry you are not in the same channel");

    if (!guildIDData.dispatcher.paused) return message.channel.send("The music has not been paused.");

    guildIDData.dispatcher.resume();

    return message.channel.send("Successfully rebooted.");

}

module.exports.help = {
    name: "resume",
    description: "Resume your music",
    category: "Music"
}