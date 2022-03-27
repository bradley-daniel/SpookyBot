module.exports = {
    name: 'test',
    permissions: ['ADMINISTRATOR'],
    description: 'updates message embeds or messages sent by the bot after bot comes online',
    arguments: [],
    async execute(client, message, args){
        const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
        const rulesChannel = message.guild.channels.cache.find((c) => c.name.toLowerCase() === '📕rules')
        await rulesChannel.messages.fetch({limit: 1}).then((msgs) => {
            msgs.forEach(msg => {
                console.log(msg)
            });
        })
    }

}