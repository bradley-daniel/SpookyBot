module.exports = async (Discord, cleint,  reaction, user) =>{
    //message reaction that need to be saved between when the bot is ofline and online
    const tosMessageID = '956411360936357989';
    //switchs between different messages
    switch(reaction.message.id){
        case tosMessageID:
            const memberRole = reaction.message.guild.roles.cache.find(role => role.name === 'Member');
            await reaction.message.guild.members.cache.get(user.id).roles.remove(memberRole); 
        break;
    }
}