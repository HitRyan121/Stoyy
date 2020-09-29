const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("Invite the discord stoyy bot to your discord server https://discord.com/oauth2/authorize?client_id=739825654996009042&scope=bot&permissions=8");

}

module.exports.help = {
    name: "invite",
    description: "Invite the Stoyy bot to your discord server",
    category: "Info"
}