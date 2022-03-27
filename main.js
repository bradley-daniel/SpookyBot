const Discord = require('discord.js');
const { Intents } = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({
	partials:[
		"MESSAGE",
		"CHANNEL",
		"REACTION"
	],
	intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MESSAGES, 
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
		Intents.FLAGS.GUILD_BANS,

	],
});
client.commands = new Discord.Collection();
['command_handler', 'event_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);



