const { MessageEmbed } = require("discord.js");
const library = require('../../libraries/library.js');
module.exports = {
	name: 'bal',
	permissions: [],
	description: 'This command is used to return the number of tokens this user has',
	arguments: [],
    catagory: 'econ_commands',
	async execute(client, message, args, profileData) {
		let tokens = library.numberWithCommas(profileData.tokens);
		const balEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.addFields({
				name: message.author.username + "'s Wallet",
				value: 'Tokens: **฿' + tokens + '**',
			});
		message.reply({ embeds: [balEmbed] })
    }
}