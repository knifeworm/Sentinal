const client = require("../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async(member) => {
  const Channel = member.guild.channels.cache.get('851703560798470164')
  const embed = new MessageEmbed()
  .setColor("GREEN")
  .setTitle("Member Join")
  .setDescription(`**${member.displayName}** Joined ${member.guild.name}, We Have Now ${member.guild.memberCount} Members`)
  Channel.send({ embeds: [embed] })
})