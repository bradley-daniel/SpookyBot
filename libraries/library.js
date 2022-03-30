fs = require('fs');


function getValidPermissions(command, message) {
	const validPermissions = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
	const invalidPerms = [];
	if (command.permissions.length) {
		for (const perms of command.permissions) {
			if (!validPermissions.includes(perms)) {
				return console.log(`Invalid Perm ${perm}`);
			}
			if (!message.member.permissions.has(perms)) {
				invalidPerms.push(perms);
				break;
			}
		}
	}
	return invalidPerms;
}
function formatString(array, format) {
	let string = '';
	array.forEach((element) => {
		string += ' ' + format + '' + element + '' + format + ' ';
	});
	return string;
}
function numberWithCommas(x) {
	x = x.toString();
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
	return x;
}
async function setReactionSystem(channel, reactionMessage, reactions) {
	try {
		reactions.forEach(async function (reaction) {
			await reactionMessage.react(reaction);
		});
	} catch {
		channel.send('error sending messages');
		throw err;
	}
}
async function deleteUpTo(channel, message, targetMessage) {
	let found = false;
	let msgs = [];
	let messages = await channel.messages.fetch({ limit: 100 });
	messages.forEach((msg) => {
		if (msg.id == targetMessage.id) found = true;
		if (!found && msg) msgs.push(msg);
	});
	message.channel.bulkDelete(msgs);
}
async function sendTemporaryMessage(message, contents, time) {
	const tempMessage = await message.channel.send(contents);
	tempMessage.delete({ timeout: time });
}


module.exports.formatString = formatString;
module.exports.deleteUpTo = deleteUpTo;
module.exports.setReactionSystem = setReactionSystem;
module.exports.getValidPermissions = getValidPermissions;
module.exports.sendTemporaryMessage = sendTemporaryMessage;
module.exports.numberWithCommas = numberWithCommas;
