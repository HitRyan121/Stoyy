
module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment.");

    if (message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry you are not in the same channel");

    if (isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.reply("Please enter a number between 0 - 150");

    guildIDData.dispatcher.setVolume(args[0] / 100);

    return message.channel.send(`Volume adjusted to ${args[0]}`);

}

module.exports.help = {
    name: "volume",
    description: "Change the volume",
    category: "Music"
}