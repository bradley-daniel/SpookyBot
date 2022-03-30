const profileModel = require('../models/profileSchema');
async function getProfileData(message){
	const member = message.author;
	try{
		profileData = await profileModel.findOne({ userID: member.id });
		if (!profileData) {
			let profile = await profileModel.create({
				userID: member.id,
				serverID: message.guild.id,
				tokens: 0,
				inventory: [],
			});
			profile.save();
			profileData = profile;
		}
	} catch (err) {
		console.log(err);
		return;
	}
	return profileData;
}
async function addTokens(){
    
}
module.exports.getProfileData = getProfileData;