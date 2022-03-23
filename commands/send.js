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
					.setTitle('Tos')
					.setDescription("The member roles is a badge that says that you argree to the rules and accept a ban if they are broken!")
					.addFields(
						{ name: 'Instuctions', value: 'Reply to this message with a green checkmark understanding that you have read the rules' }
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
				rules += '2. No hate speach of any kind\n\n';
				rules += '3. No NSFW content\n\n';
				rules += '4. Self promoting is not allowed unless done thru clips of gamplay\n\n';
				rules += '5. Keep personal promblems within dm\'s unless they result in harassment\n\n';
				rules += '6. Doxing anyone is not permitted inclueding banned members';
				rulesInformation = 'The inablity to follow any of these rules will make you receive a ban.\n Bans are issued to a member if suffiecent evadence is issued to a mod or if the mod witness the rules break.\n If you believe you did not warrent a ban send a message in the unban-request channel, **DM requests are not accepted!**';
				message.delete();
				const rulesEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Rules')
					.setDescription(rules)
					.addFields(
						{ name: 'Rules Information', value: rulesInformation }
					);
				message.channel.send({ embeds: [rulesEmbed]});
			case 'streaming':
				//send streaming [game]
				message.delete();
				const streamingEmbed = new MessageEmbed()
					.setColor('6441a5')
					.setTitle('Streaming Anouncment!')
					.setDescription('Come check my stream I will be playing ' + args[1])
				message.channel.send({ embeds: [streamingEmbed]});	

			break;
		}
	},
};
