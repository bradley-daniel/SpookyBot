module.exports = {
	name: 'ping',
	permissions: [],
	description: 'This sees if the bot is online!',
	arguments: [],
	execute(client, message, args) {
		message.channel.send('Pong');
	},
};
