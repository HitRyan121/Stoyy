const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "760420635566145536";

    if (!message.member.hasPermission("KICK_MEMBER")) return message.reply("You can't do this");

    if (message.channel.parentID == categoryID) {

        message.channel.delete();

        // Create embed.
        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("The ticket is marked as ** complete **.")
            .setFooter("Ticket closed");

        // Channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "『📰』logs");
        if (!ticketChannel) return message.reply("Channel does not exist");

        ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("Please do this command with a ticket.");

    }



}

module.exports.help = {
    name: "close",
    description: "Close a ticket",
    category: "Info"
}