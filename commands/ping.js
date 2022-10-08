const { SlashCommandBuilder } = require('@discordjs/builders');

 function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

module.exports = {
    name: "ping",
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("get the bot's ping."),
    /*- execute -*/
	async execute(Discord, client, interaction) {
        const delay = Math.abs(Date.now() - interaction.createdTimestamp);
        await interaction.reply({content: "Calculating current ping"})
        const pingEmbed = new Discord.EmbedBuilder()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .setTitle(`Current Ping`)
            .setDescription(`🏓 Latency is ${delay}ms \n🖥️ API Latency is ${Math.round(client.ws.ping)}ms\n🆙 Uptime: ${secondsToDhms(Math.floor(process.uptime()))}`)
            .setColor('#d00a09')
            .setTimestamp()
            .setFooter({text: "⚙️", iconURL: client.user.displayAvatarURL()})       
        interaction.editReply({content: null, embeds: [pingEmbed]})
	},
};