const discord = require("discord.js");
const client = new discord.Client();
require("dotenv").config();

const token = process.env.TOKEN;

client.login(token);

client.on('ready', () => {
    console.log("Bot online!");
});

// First command for the bot
// if ping messaged in a channel, the bot will respond pong 
client.on('message', message => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }
});

client.on('message', message => {
    if (message.content.toLowerCase().includes("hello bot")) {
        message.channel.send("hello " + message.author.toString());
    }
});

//This will greet new members 
client.on('guildMemberAdd', member => {
    //Find the channel
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send("Welcome to the server " + member.toString());
});

const prefix = "bot"

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return
    else {
        const msgSplit = message.content.slice(prefix.length + 1).split(/ +/);
        const command = msgSplit[0];
        const args = msgSplit.slice(1);

        if (command.toLowerCase() === "speak") {
            message.channel.send("Speaking!!!!")
        } else if (command.toLowerCase() === "play") {
            if (message.member.voice.channel) {
                const connection = message.member.voice.channel.join();
            } else {
                message.channel.send("Please join to a voice channel")
            }
        }
    }
});