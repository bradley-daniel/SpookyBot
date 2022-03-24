const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'send',
	permissions: ['ADMINISTRATOR'],
	description: 'Get the bot to send a message to the channel that the command was sent',
	arguments: ['message'],
	async execute(client, message, args, discord) {
		const possableMessages = ['tos'];

		switch (args[0]) {
			case 'tos':
				message.delete();
				const tosMessageChannel = message.channel;
				const tosEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('TOS')
					.setDescription("The member roles is a badge that says that you agree to the rules and accept a ban if they are broken!")
					.addFields(
						{ name: 'Instuctions', value: 'React to this message with a green checkmark to get member role!' }
					);
				const tosMessage = await message.channel.send({embeds: [tosEmbed]});
				tosMessage.react('✅');
				const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
				client.on('messageReactionAdd', async (reaction, user) => {
					if(reaction.message.partial) await reaction.message.fetch();
					if(reaction.partial) await reaction.fetch();
					if(user.bot) return;
					if(!reaction.message.guild) return;
					if(reaction.message.channel.id == tosMessageChannel.id){
						await reaction.message.guild.members.cache.get(user.id).roles.add(memberRole)
					}else return;
				});
				client.on('messageReactionRemove', async (reaction, user) => {
					if(reaction.message.partial) await reaction.message.fetch();
					if(reaction.partial) await reaction.fetch();
					if(user.bot) return;
					if(!reaction.message.guild) return;
					if(reaction.message.channel.id == tosMessageChannel.id){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(memberRole)
					}else return;
				});
				break;
			case 'rules':
				let rules = '1. No racism or harassment\n\n';
				rules += '2. No hate speech of any kind\n\n';
				rules += '3. No NSFW content';
				rules += '4. Self-promoting is not allowed unless done thru clips of gameplay\n\n';
				rules += '5. Keep personal problems within dm\'s unless they result in harassment';
				rules += '6. Doxing anyone is not permitted this includes banned members;';
				rules += '7. Don\'t act like a feral animal';
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
