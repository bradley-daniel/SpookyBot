module.exports = {
    name: 'test',
    permissions: ['ADMINISTRATOR'],
    description: 'updates message embeds or messages sent by the bot after bot comes online',
    arguments: [],
    async execute(client, message, args){
        console.log(client.user.id);
    }

}