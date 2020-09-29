const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment.");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Now playing ${nowPlaying.songTitle} || requested by ${nowPlaying.requester}. \n\n queue: \n`;

    for (let index = 0; index < queue.length; index++) {

        response += `${index}, ${queue[index].songTitle} requested by ${queue[index].requester}\n`;

    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue",
    description: "How much songs are in the queue",
    category: "Music"
}