module.exports = async (Discord, client, message) => {
    let messageDeleted = new Date().getTime();
    if(message.mentions.users.size > 0 && messageDeleted - message.createdTimestamp < 3600000){
        message.channel.send('<@' + message.author.id + '> please do not act like a feral animal by ghost pinging!');
    }
}