const library = require('../../libraries/library.js');
require('dotenv').config();

module.exports = async (Discord, client, message) => {
	const prefix = '!';

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	//used is the message in main server
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd);

	//runs if the message is a command in Spooky Casino
	if (!command) {
		message.reply('Sorry that is not a valid command please use `!help` to get all usable commands!');
	} else {
		let invalidPerms = library.getValidPermissions(command, message);
		if (invalidPerms.length) {
			return message.reply(`Missing Permissions, \` ${invalidPerms} \``);
		}
		try {
			if (command) command.execute(client, message, args, Discord);
		} catch (err) {
			console.log(err);
		}
	}
};
