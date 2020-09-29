const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    // !warn spelerNaam redenen hier.

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you can't do this");

    if (!args[0]) return message.reply("No user specified.");

    if (!args[1]) return message.reply("Please provide a reason.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Cannot find the user.");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you can't confuse this user");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarnd:** ${warnUser} (${warnUser.id})
        **Warning by:** ${message.author}
        **Reason: ** ${reason}`)
        .addField("number of warns", warns[warnUser.id].warns);

    var channel = message.member.guild.channels.cache.get("760250853646008391");

    if (!channel) return;

    channel.send(embed);

    if (warns[warnUser.id].warns == 3) {

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription("WATCH OUT!")
            .addField("Message "," You have another warning for a ban.");

        message.channel.send(embed);

    } else if (warns[warnUser.id].warns == 4) {
        message.guild.member(warnUser).ban(reason);
        message.channel.send(`${warnUser} has been banned by the bot due to too many warns`);
    }
}

module.exports.help = {
    name: "warn",
    description: "Warns Someone",
    category: "Admin"
}