const { MessageEmbed, Permissions, Message } = require('discord.js');

module.exports = {
    name: 'ban',
    category: "administrator",
    description: "Bans the user",
    accessableby: "Administrator",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    aliases: ["k"],
    run: async(client, message, args, prefix) => 
    {
        if(!message.content.startsWIth(prefix)) return;
        try {
            if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You do not have the permission **BAN MEMBERS**");
            if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("Sorry but i don't seem to have the permission to do this!");

            if(!args[0]) return message.reply('**Enter a user to ban**');

            var banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!banMember) return message.reply("**User is not in this guild!**");

            if(banMember.id === message.member.id) return message.reply('**You cannot ban yourself**');

            if(!banMember.banable) return message.reply("**Cannot ban this user!**");
            if(banMember.user.bot) return message.reply("**Cannot ban bots!**");

            var reason = args.slice(1).join(" ");
            try{
                const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**Hello, You have been Banned from ${message.guild.name} for - ${reason || "No Reason!"}**`)
                .setFooter(message.guild.name, message.guild.iconURL());
                banMember.send({ embeds: [embed] }).then(() => banMember.ban()).catch(() => null)
            } catch {
                banMember.ban();
            }
            if(reason) {
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`);
                message.reply({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** Has been banned for no reason!`);
                message.reply({ embeds: [embed3] });
            }
        } catch(e)
        {
            return message.reply(`**${e.message}**`);
        }
    }
}