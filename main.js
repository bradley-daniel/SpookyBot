const Discord = require('discord.js');
const mongoose = require('mongoose');
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
mongoose
	.connect(process.env.MONGODB_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log(err);
	});

client.commands = new Discord.Collection();
['command_handler', 'event_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);



