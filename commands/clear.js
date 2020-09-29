const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // !clear aantal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You are not allowed to do this.");

    if (!args[0]) return message.reply("Specify a number");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] <= 0) {
                message.reply("Are you stupid I can not delete 0 messages").then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] == 1) {
                message.reply("I deleted 1 post").then(msg => msg.delete({ timeout: 3000 }));
            } else {
                message.reply(`I have ${args[0]} messages deleted`).then(msg => msg.delete({ timeout: 3000 }));
            }

        })

    } else {
        return message.reply("Enter a number.");
    }

}

module.exports.help = {
    name: "clear",
    description: "Deleted the messages",
    category: "Admin"
}