
module.exports = async (client, discord, member) => {
	const userRoles = member.roles.cache.map((r) => r.name);
	if(userRoles.includes('Banned')){
		member.ban();
	}
};
