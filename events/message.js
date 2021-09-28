const client = require('../index.js');
const config = require('../config.json');
const db = require("quick.db")

client.on('messageCreate', async message => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (message.mentions.has(client.user)) {
        message.reply(`Hello! My name is Sentinal! The prefix for this server is **${prefix}**`);
    }
});