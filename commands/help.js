const botConfig = require("../botconfig.json");

module.exports.run = async (client, message) => {

    // try {

    //     var text = "**YT BOT** \n\n **__Commands__** \n !hallo - Geeft een hallo terug. \n !info - Geeft info.";

    //     message.author.send(text);

    //     message.reply("Alle commands kan je vinden in je prive berichten");

    // } catch (error) {
    //     message.reply("Er is iets fout gelopen");
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    client.commands.forEach(command => {

        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category
        }

        commandList.push(constructor);

    });

    var response = "**Bot commands**\n\n";
    var general = "**__General__**\n";
    var Info = "\n**__Information__**\n";
    var Music = "\n**__Music__**\n";
    var Fun = "\n**__Fun__**\n";
    var Admin = "\n**__Admin__**\n";

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "General") {

            general += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["category"] == "Info") {

            Info += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }

        else if (command["category"] == "Music") {

            Music += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }

        else if (command["category"] == "Fun") {

            Fun += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }
        else if (command["category"] == "Admin") {

            Admin += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }


    }

    response += general;
    response += Info;
    response += Fun;
    response += Music;
    response += Admin;


    message.author.send(response).then(() => {
        message.channel.send("All commands are in your private messages! :mailbox_with_mail:");
    }).catch(() => {
        message.channel.send("Your private messages are off so you have not received anything.");
    });

}

module.exports.help = {
    name: "help",
    description: "Gives you this list",
    category: "General"
}