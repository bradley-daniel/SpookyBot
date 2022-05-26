const { MessageEmbed, Collector } = require("discord.js");

module.exports = {
	name: 'send',
	permissions: ['ADMINISTRATOR'],
	description: 'Get the bot to send a message to the channel that the command was sent',
	arguments: ['message'],
	async execute(client, message, args) {
		const possableMessages = ['tos', 'rules', 'streaming', 'welcome', 'twitchNotification'];
		switch (args[0]) {
			case 'tos':
				message.delete();
				//const tosMessageChannel = message.channel;
				const tosEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('TOS')
					.setDescription("The member roles is a badge that says that you agree to the rules and accept a ban if they are broken!")
					.addFields(
						{ name: 'Instuctions', value: 'React to this message with a green checkmark to get member role!' }
					);
				const tosMessage = await message.channel.send({embeds: [tosEmbed]});
				await tosMessage.react('✅');
				const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
				break;
			case 'twitchNotification':
				message.delete()
				const twitchNotificationEmbed = new MessageEmbed()
					.setColor('#6441a5')
					.setTitle('Twitch Notification')
					.setDescription('React to this message to get a ping every time SpookyMrGhost goes live at https://www.twitch.tv/spookymrghost' + '!');
				const twitchNotificationMessage = await message.channel.send({embeds: [twitchNotificationEmbed]});
				await twitchNotificationMessage.react('✅');
				const twitchNotificationRole = message.guild.roles.cache.find(role => role.name === 'Twitch Notification');
			break;
			case 'rules':
				let rules = '1. No racism or harassment\n\n';
				rules += '2. No hate speech of any kind\n\n';
				rules += '3. No NSFW content\n\n';
				rules += '4. Self-promoting is not allowed unless done thru clips of gameplay\n\n';
				rules += '5. Keep personal problems within dm\'s unless they result in harassment\n\n';
				rules += '6. Doxing anyone is not permitted this includes banned members\n\n';
				rules += '7. Don\'t act like a feral animal\n\n';
				rulesInformation = 'The inability to follow any of these rules will make you receive a ban.\n Bans are issued to a member if sufficient evidence is issued to a mod or if the mod witnesses the rules break.\n If you believe you did not warrant a ban send a message in the unban-request channel, **DM requests are not accepted!**';
				message.delete();
				const rulesEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Rules')
					.setDescription(rules)
					.addFields(
						{ name: 'Rules Information', value: rulesInformation }
					);
				message.channel.send({ embeds: [rulesEmbed]});
			break;
			case 'streaming':
				//send streaming [game]
				message.delete();
				let streamingMesssage = 'Streaming Anouncment @everyone!\n';
				streamingMesssage += 'https://www.twitch.tv/spookymrghost'
				message.channel.send(streamingMesssage);
			break;
			case 'welcome':
				message.delete();
				let welcomeMessage = 'This is a community server for my streaming community.\n';
				welcomeMessage += 'Every time I go live Spooky Bot will send a message that alerts everyone in <#956351663218753656>.\n';
				welcomeMessage += '**To proceed to the server please review the rules and agree to the tos message sent by Spooky Bot.**\n';
				message.channel.send(welcomeMessage);
			break;
		}
	},
};
