module.exports = {
	name: 'clear',
	permissions: ['ADMINISTRATOR'],
	description: 'Clears messages for current channel!',
	arguments: ['number'],
	async execute(client, message, args) {
		if (!args[0]) return message.reply('please enter the amount of messages that you want to clear!');
		if (isNaN(args[0])) return message.reply('please enter a real nummber!');

		if (args[0] > 100) return message.reply('plaese enter a number less than 100!');
		if (args[0] < 1) return message.reply('plaese enter a number greater than 0!');

		await message.channel.messages.fetch({ limit: args[0] }).then((messages) => {
			message.channel.bulkDelete(messages);
		});
	},
};
