const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

    // !tempmute persoon tijd (h,m,s).

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you can't do this");

    if (!args[0]) return message.reply("No user specified.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("Cannot find the user.");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you cannot mute this user");

    var muteRole = message.guild.roles.cache.get('760250791746469948');
    if (!muteRole) return message.channel.send("The role muted does not exist.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("No time specified");

    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} has been muted for ${muteTime}`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} is geunmute`);

    }, ms(muteTime));
}

module.exports.help = {
    name: "tempmute",
    description: "TempMute someone",
    category: "Admin"
}