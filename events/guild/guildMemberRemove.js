
module.exports = async (Discord, client, member) => {
	const userRoles = member.roles.cache.map((r) => r.name);
	if(userRoles.includes('Banned')){
		member.ban();
	}
};
