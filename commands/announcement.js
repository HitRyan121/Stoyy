const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !announcement title | bericht | kleur | kanaal

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you can't");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Use")
            .setColor("#00ee00")
            .setDescription(`Make an announcement using: \n! Announcement title ${seperator} Message ${seperator} Coler ${seperator} Channel`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "general";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "No content provided",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle("Announcement")
        .setColor(options.kleur)
        .setDescription(`Message of ${message.author} \n\n ${options.titel} \n ${options.bericht}`)
        .setTimestamp();

    var channel = message.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if (!channel) return message.reply("This channel does not exist");

    channel.send(announceEmbed);

}

module.exports.help = {
    name: "announcement",
    description: "Gives an announcement",
    category: "Admin"
}