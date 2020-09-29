const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // sps steen, papier, schaar

    if (!args[0]) return message.reply("Use rps <rock, paper, scissors>");

    var options = ["rock", "paper", "scissors"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "ROCK") {

        if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, I win`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, You win`);

        } else if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, It's a draw`);

        }

    }
    else if (args[0].toUpperCase() == "PAPER") {

        if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, i  win`);

        } else if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, You win`);

        } else if (result == "paper") {

            return message.channel.send(`I Have ${result} :notepad_spiral:, its a draw`);

        }

    } else if (args[0].toUpperCase() == "SCISSORS") {

        if (result == "rock") {

            return message.channel.send(`I have ${result} :moyai:, I win`);

        } else if (result == "paper") {

            return message.channel.send(`I Have ${result} :notepad_spiral:, You win`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, Its a draw`);

        }

    }

}

module.exports.help = {
    name: "rps",
    description: "Rock Paper scissors shoot!",
    category: "Fun"
}