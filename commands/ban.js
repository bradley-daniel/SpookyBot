const { MessageEmbed } = require("discord.js");
//NEED TO ADD TIME OF THE BAN TO EMBED

//const Discord = require('discord.js');  
module.exports = {
    name: 'ban',
    permissions: ['KICK_MEMBERS'],
    description: 'This command allows mods to ban members and state a reason and time period(Seconds)\nAn hour is 3600 Seconds or perm(for permaban)',
    arguments: ['@member', 'reason', 'time'],
    execute(client, message, args){
        if(args[2] !== 'perm' && isNaN(args[2])) return message.reply("The time specified is not a valid amount");
        if(args[1] == null) return message.reply("Need a reason to ban");

        const banTimeMilliseconds = args[2] * 1000;
        const member = message.mentions.users.first();
        //Banned role
        const bannedRole = message.guild.roles.cache.find(role => role.name === 'Banned');
        if(member){
            //Bans Channels
            const banChannel = message.guild.channels.cache.get('954498995726733312');
            //Member
            const memberTarget = message.guild.members.cache.get(member.id);
            const memberName = member.username + '#' + member.discriminator;
            //Embed
            const bannedEmbed = new MessageEmbed()
                .setColor('#d90000')
                .setTitle('Member Banned')
                .addFields(
                    { name: 'Member', value: '**Username:** ' + memberName + '\n**Id:** ' + member.id },
                    { name: 'Reason', value: args[1] },
                    { name: 'Time', value: args[2] + ' seconds'}
                );
            banChannel.send({ embeds: [bannedEmbed] });
            //Role
            const memberTargetRoles = memberTarget.roles.cache.map(r => r.id);
            memberTargetRoles.forEach(role => {
                if(role != '939246503917142136') {
                    memberTarget.roles.remove(role);
                    memberTarget.roles.add(bannedRole);
                }
            });
            //permentlly banned
            if(args[2] === 'perm'){
                return;
                
            }
            //time banned
            setTimeout(function() {
                memberTarget.roles.remove(bannedRole);
            }, banTimeMilliseconds);

        }else{
            message.channel.send('Could not find that member');
        }
        
    }
}
