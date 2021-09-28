const {discord, Permissions} = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setprefix',
    run: async (client, message, args, prefix) => {
        if(!message.content.startsWith(prefix)) return;

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('You do not have the **ADMINISTRATOR** permission.');
        const newprefix = args[0];
        if(!newprefix) return message.reply('Please enter a prefix.');
        if(newprefix.length > 5) return message.channel.send("Invalid Prefix, Prefix is Too long");
        message.channel.send(`New Prefix Set To **${newprefix}**`);
        db.set(`prefix_${message.guild.id}`, newprefix);
    }
}