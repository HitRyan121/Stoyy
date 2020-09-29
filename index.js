const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const database = require("./database.json");
const mysql = require("mysql");

const activeSongs = new Map();

//  Command handler
const fs = require("fs");
const { isFunction } = require("util");

const client = new discord.Client();


//  Command handler
client.commands = new discord.Collection();


client.login(process.env.token);

var con = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database
});

con.connect(err => {
    if (err) throw err;
});


//  Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


client.on("guildMemberAdd", member => {

    // var role = member.guild.roles.cache.get('462166173690232842');

    // if (!role) return;

    // member.roles.add(role);


    con.query(`SELECT IDRole FROM rollen WHERE IDUser = '${member.user.id}'`, (err, rows) => {

        if (err) throw err;

        if (rows.length > 0) {

            for (let index = 0; index < rows.length; index++) {
                const role = rows[index];

                member.roles.add(role.IDRole);
            }

        }

    });


    var channel = member.guild.channels.cache.get('760250814828380230');

    if (!channel) return;

    // channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hello ${member.user.username}`)
        .setTitle("**Welcome on Stoyy**")
        .setThumbnail(member.user.displayAvatarURL({size: 4096}))
        .setColor("#00FF00")
        .setFooter("User Joined")
        .setTimestamp();

    channel.send(joinEmbed);

});


client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('760250814828380230');

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL({size: 4096}))
        .setColor("#FF0000")
        .setFooter("User Leaved")
        .setTimestamp();

    channel.send(leaveEmbed);

});


const activities_list = [
    ".help | dsc.bio/StoyyYT`",
    "stoyy on youtube",
    `Sub to Stoyy`
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: "LISTENING" });
    }, 10000); 
    console.log(`${client.user.username} is online.`);
});

client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "Geen tekst te vinden";

    var respone = `Message ${messageDeleted.id} is Deleted out ${messageDeleted.channel}\n **Message:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.id} ${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(respone)
        .setTimestamp()
        .setColor("#FF0000");

    client.channels.cache.find(c => c.name == "『📰』logs").send(embed);

});

// var swearWords = ["koe", "kalf", "varken"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;


    // var msg = message.content.toLowerCase();

    // for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete({ timeout: 3000 }));

    //     }

    // }


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var senteceUser = "";
    var amountSwearWords = 0;

    for (let y = 0; y < messageArray.length; y++) {

        const word = messageArray[y].toLowerCase();

        var changeWord = "";

        for (let i = 0; i < swearWords["curse words"].length; i++) {

            if (word.includes(swearWords["curse words"][i])) {

                changeWord = word.replace(swearWords["curse words"][i], "******");

                senteceUser += " " + changeWord;

                amountSwearWords++;

            }

        }

        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }

    }

    if (amountSwearWords != 0) {

        message.delete();
        message.channel.send(senteceUser);
        message.channel.send("Please don't swear");
    }



    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    //  Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, options);

});
