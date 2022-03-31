const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, client, member) =>{
    const welcome_channel = member.guild.channels.cache.find((c) => c.name === '📃welcome');
    const botId = client.user.id;
    const rulesChannelId  = member.guild.channels.cache.find((c) => c.name === '📕rules');
    welcome_channel.send('<@' + member.id + '> welcome to the server, please look over the rules in <#' + rulesChannelId + '> and accept the **TOS** from <@' + botId + '>');
}
