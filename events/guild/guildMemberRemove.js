const profileModel = require('../../models/profileSchema');
module.exports = async (Discord, client, member) => {
	const userRoles = member.roles.cache.map((r) => r.name);
	try {
		const response = await profileModel.deleteOne({ userID: member.id });
	} catch (err) {
		console.log(err);
	}
	if(userRoles.includes('Banned')){
		member.ban();
	}
};
