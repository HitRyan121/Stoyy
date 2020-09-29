const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var embed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .setThumbnail(`${message.author.avatarURL({ size: 4096 })}`)
        .setTitle("ZeonHosting X Stoyy")
        .addField("Need support for Stoyy bot?")
        .addField("Go join Stoyy Server https://discord.gg/KyTMY4u !")
        .addField("Cheap hosting? ZeonHosting https://discord.gg/KyTMY4u ");
    message.channel.send(embed)
}

module.exports.help = {
    name: "support",
    description: "Need support?",
    category: "Info"
}