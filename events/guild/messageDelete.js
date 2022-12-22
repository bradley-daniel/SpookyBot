module.exports = async (Discord, client, message) => {
    let messageDeleted = new Date().getTime();
    if(message.mentions.users.size > 0 && messageDeleted - message.createdTimestamp < 3600000){
        message.channel.send('<@' + message.author.id + '> please do not act like a feral animal!');
        let member = message.guild.members.cache.get(message.author.id);
        await member.timeout(3600000, 'Ghost pinging');
    }
}