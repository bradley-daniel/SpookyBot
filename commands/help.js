const fs = require('fs');
const library = require('../libraries/library.js');
const { MessageEmbed, SystemChannelFlags } = require('discord.js');
module.exports = {
	//need to add seperate cataory suppprt
	name: 'help',
	permissions: [],
	description: 'Gives user a list of commands or helps user find help on a single command',
	arguments: [' ', 'command'],
	async execute(client, message, args) {
		const commandNames = client.commands.map((element) => element.name);
		var validCommands = [];

		//get the commands that the user can use based on server perms
		commandNames.forEach(function (element, index) {
			let command = client.commands.find(({ name }) => name === element);
			let invalidPerms = library.getValidPermissions(command, message);
			if (!invalidPerms.length) {
				validCommands.push(commandNames[index]);
			}
		});
		sCommands = library.formatString(validCommands, '`');

		//check if the user getting help on all availbe commands or getting help on just one command
		if (args.length < 1) {
			const helpEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Help Sent!')
				.setDescription("**Every command needs the prefix '!' to work!**\nFor more help on specific command do `!help [command]`")
				.addFields({ 
					name: "Spooky Bot Commands", value: sCommands 
				});
			message.reply({ embeds: [helpEmbed] });
			//message.channel.send(helpEmbed);

		} else if (!validCommands.includes(args[0])) {
			return message.reply('Sorry that is not a command that you can get help with use `!help` to get all usable commands');
		} else {
			let invalidPerms = library.getValidPermissions(client.commands.get(args[0]), message);
			if (!invalidPerms.length) {
				const command = client.commands.find(({ name }) => name === args[0]);
				const commandExamples = formatCommandExamples(command);
				if (command) {
					const helpEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Help Sent!')
						.addFields(
							{ name: 'Command', value: '`!' + command.name + '`' }, 
							{ name: 'Description', value: command.description }, 
							{ name: 'Example Use', value: commandExamples}
						);
					message.reply({ embeds: [helpEmbed] });
				}
			}
		}
	},
};

//formats the command oject to a string of example commands
function formatCommandExamples(command) {
	var commandArgs = '';
	var commandExamples = '';
	if (command.arguments) {
		command.arguments.forEach(function (element, index) {
			if (element != ' ') {
				commandArgs += ' [' + command.arguments[index] + ']';
			} else if (element == ' ') {
				commandExamples += '`!' + command.name + commandArgs + '`\n';
			}
		});
	}

	if (command.arguments) {
		commandExamples += '`!' + command.name + commandArgs + '`\n';
	} else {
		commandExamples += '`!' + command.name + commandArgs + '`';
	}
	return commandExamples;
}
