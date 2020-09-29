const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    var roles = message.guild.roles.cache.size - 1;
    var embed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .setThumbnail(message.guild.iconURL({ size: 4096 }))
        .setTitle(`${message.guild.name}`)
        .addField("ID", `${message.guild.id}`)
        .addField("owner:", `${message.guild.owner.user.tag}`, true)
        .addField("region", `${message.guild.region}`, true)
        .addField("Bots", `${message.guild.members.cache.filter(m => m.user.bot).size}`, true)
        .addField("People", `${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot)}`, true)
        .addField("total members", message.guild.memberCount, true)
        .addField("online", `${message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size}`, true)
        .addField("text channels", `${message.guild.channels.cache.filter(chan => chan.type == "text").size}`, true)
        .addField("Voice Channels", `${message.guild.channels.cache.filter(chan => chan.type == "voice").size}`, true)
        .addField("made on", `${moment(message.guild.createdAt).format('LL')}`)
        .addField("joined on", `${moment(message.member.JoindedAt).format('LL')}`)
        .addField(`roles[${roles}]`, `${message.guild.roles.cache.map(r => r).join(" ")}`);


    message.channel.send(embed);

}

module.exports.help = {
    name: "serverinfo",
    description: "Give info about the sevrer",
    category: "Info"
}