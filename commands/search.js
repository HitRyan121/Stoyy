const search = require("yt-search");

module.exports.run = async (client, message, args, ops) => {

    search(args.join(" "), function (err, res) {

        if (err) return message.channel.send("Something went wrong.");

        var videos = res.videos.slice(0, 10);

        var respone = "";

        for (var vid in videos) {
            respone += `**[${parseInt(vid) + 1}]:** ${videos[vid].title} \r\n`;
        }

        respone += `Choose a number between 0 and ${videos.length}.`;

        message.channel.send(respone);

        const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos;

        collection.once("collect", function (music) {

            var commandFile = require("./play.js");

            commandFile.run(client, message, [this.videos[parseInt(music.content) - 1].url], ops);

        });

    });

}

module.exports.help = {
    name: "search",
    description: "Search songs",
    category: "Music"
}