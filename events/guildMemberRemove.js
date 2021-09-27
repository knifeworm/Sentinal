const client = require("../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberRemove', async(member) => {
    const Channel = member.guild.channels.cache.get('851703560798470164')
    const embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Member Left")
    .setDescription(`**${member.displayName}** Left ${member.guild.name}, We have now ${member.guild.memberCount} members.`);
    Channel.send({ embeds: [embed] })
});