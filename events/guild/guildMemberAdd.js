const profileModel = require('../../models/profileSchema');

module.exports = async (client, Discord, member) =>{
    const welcome_channel = member.guild.channels.cache.get('958144614752202792')
    const botId = '955473532253515816';
    const rulesChannelId = '939246503917142140'
    welcome_channel.send('<@' + member.id + '> welcome to the server, please look over the rules in <#' + rulesChannelId + '> and accept the tos from <@' + botId + '>');
}
