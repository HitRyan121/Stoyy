const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var ledenTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    var people = ledenTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;

    var ledenEmbed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .addField("Members", ledenTotal, true)
        .addField("Bots", bots, true)
        .addField("people", people, true)
        .addField("Online", online, true);

    message.channel.send(ledenEmbed);

}

module.exports.help = {
    name: "members",
    description: "Give info how much people are in the discord server",
    category: "Info"
}