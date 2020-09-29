const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //!review number Stars Text test test

    const amountStars = args[0];

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Please specify a number between 1 and 5 stars");

    var text = args.splice(1, args.length).join(" ") || '**No text provided**';

    var channel = message.member.guild.channels.cache.get("760432876319014923");

    if (!channel) return message.channel.send("Channel does not exist");

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars += ":star: ";

    }

    message.delete();

    const embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} Written and review`)
        .setColor("#00ff00")
        .addField("Stars: ", stars)
        .addField("Review: ", text);

    message.channel.send("✅ You have successfully written a review");

    return channel.send(embed);

}

module.exports.help = {
    name: "review",
    description: "Give Review's about the mod menu",
    category: "Info"
}