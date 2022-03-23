module.exports = {
	name: 'send',
	permissions: ['ADMINISTRATOR'],
	description: 'Get the bot to send a message to the channel that the command was sent',
	arguments: ['message'],
	async execute(client, message, args, discord) {
		const possableMessages = ['help', 'channel'];

		switch (args[0]) {
			case 'channel':
				reactionMessage = await message.channel.send('This message allows the user to delete the channel or lock the channel');
				reactionMessage.pin();
				try {
					await reactionMessage.react('🔒');
					await reactionMessage.react('⛔');
				} catch {
					channel.send('error sending messages');
					throw err;
				}
				//collects the reaction a does a command depending on reation
				const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'), { dispose: true });
				collector.on('collect', (reaction, user) => {
					switch (reaction.emoji.name) {
						case '🔒':
							message.channel.updateOverwrite(message.author, {
								SEND_MESSAGES: false,
							});
							break;
						case '⛔':
							message.channel.send('Channel will be deleted in **5 seconds**');
							setTimeout(() => message.channel.delete(), 5000);
							break;
					}
				});
				break;
		}
	},
};
