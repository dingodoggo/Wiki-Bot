const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('superagent');

// Discord client
const bot = new Discord.Client();


const prefix = "!";

bot.on('ready', () => {
        bot.user.setGame('!commands for help');
});


bot.on('message', (message) => {

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
    var query = message.content.substring(6);
    var charLook = message.content.substring(9);
    var aqChar = message.content.substring(8);

    if (message.channel.id === '334783038162468864' || '248515210082648064') {
        switch (args[0].toLowerCase()) {
            case "commands":
                message.channel.send("The following are the commands used in this channel.");
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "!aqwchar",
                        value: "Syntax: !aqwchar <Player>\nThis looks up the character page of your desire.",
                    },
                    {
                        name: "!sellback",
                        value: "Syntax: !sellback <Price> <AC/Gold>\nThis tells you the sellback price of the item. AC Items will tell produce 'Before/After 24 Hours' values.",
                    },
                    {
                        name: "!wiki",
                        value: "Syntax: !wiki <query>\nThis searches the AQW wikidot for the query you have inputed.",
                    }]
                }});
            break;
            case "aqwchar":
                var char = charLook.split(" ");
                if (typeof args[1] !== 'undefined') {
                    message.channel.sendMessage("Link: http://www.aq.com/character.asp?id=" + char.join("%20")); 
                }
                else message.channel.sendMessage("Please specify a name after !aqwchar");
                break;
            case "sellback":
                var price = args[1];
                var curr = args[2];

                function isInt(price) {
                    return !isNaN(price) && price > 0 && (function(price) { return (price | 0) === price; })(parseFloat(price)); }
                
                if (isInt(price) == true) {
                    if ((/Gold/i).test(curr) == true) {
                        message.channel.sendMessage("The sellback price is** " + Math.ceil(price * 0.25) + " Gold.**");
                    }
                    else if ((/AC/i).test(curr) == true) {
                        message.channel.sendMessage("Before 24 hours: **" + Math.ceil(price * 0.90) + " AC**" + "\nAfter 24 hours: **" + Math.ceil(price * 0.25) + " AC**");
                    }
                    else message.reply("Please use the following syntax: !sellback <Price> <AC/Gold>")
                }
                else if (price > 0 || price == 0) {
                        message.channel.sendMessage("Please enter a (smaller) non-zero positive integer."); 
                }
                else message.channel.sendMessage("That's not right!");
                break;
            case "wiki":
                var term = query.split(" ");
                if (typeof args[1] !== 'undefined') {
                    message.channel.sendMessage("Wiki search: http://aqwwiki.wikidot.com/search:site/q/" + term.join("+")); }
                else message.channel.sendMessage("Please specify what you want to search after !wiki");
                break;
        }
    }

    if (message.channel.id === '355188935900790786') {
        switch (args[0].toLowerCase()) {
            case "commands":
                message.channel.send("The following are the commands used in this channel.");
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "!3dchar",
                        value: "Syntax: !3dchar <Player>\nThis looks up the character page of your desire.",
                    },
                    {
                        name: "!wiki",
                        value: "Syntax: !wiki <query>\nThis searches the AQ3D wikidot for the query you have inputed.",
                    }]
                }});
            break;
            case "wiki":
                var term = query.split(" ");
                if (typeof args[1] !== 'undefined') {
                    message.channel.sendMessage("Wiki search: http://aq-3d.wikidot.com/search:site/q/" + term.join("%20")); }
                else message.channel.sendMessage("Please specify what you want to search after !wiki");
                break;
        }
    }
});
var token = process.env.BOT_TOKEN;
bot.login(token)