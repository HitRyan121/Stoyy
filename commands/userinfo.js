const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
    if (!member) member = message.member;


    var roles = member.roles.cache.size - 1;
    var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");
    if (roles === 0) roleNames + "no roles";

    var status = member.presence.status;

    var nickName = member.nickName;
    if (nickName == null || undefined) nickName = "No";

    var embed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
        .setTitle(`${member.user.tag}`)
        .addField("id", `${member.id}`, true)
        .addField("NickName", `${nickName}`, true)
        .addField("Status", `${status}`, true)
        .addField("Game", `${member.presence.activities[0] ? member.presence.activities[0].name : 'geen'}`, true)
        .addField("Account Createdt", `${moment(member.user.createdAt).format("LL")}`)
        .addField("Server joinend", `${moment(member.user.joinedAt).format("LL")}`)
        .addField(`roles [${roles}]`, `${roleNames}`)
        .setTimestamp();

    message.channel.send(embed)



}

module.exports.help = {
    name: "userinfo",
    description: "Get's userinfo",
    category: "Info"
}