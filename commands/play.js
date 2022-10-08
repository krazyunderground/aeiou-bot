const { joinVoiceChannel, createAudioResource, createAudioPlayer, VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");

module.exports = {
    name: "play",
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play tts in VC")
        .addStringOption(option => 
            option.setName('input')
                .setDescription('TTS input')
                .setRequired(true)
        ).addChannelOption(option =>
            option.setName('channel')
            .setDescription('The channel to join')
            .setRequired(true)
            .addChannelTypes(2)   
        ),
    /*- execute -*/
	async execute(Discord, client, interaction) {
        interaction.deferReply({ephemeral: true})
        voicechannel = interaction.options.getChannel("channel")
        voiceConnection = joinVoiceChannel({
            channelId: voicechannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })

        url = await axios(`http://tts.cyzon.us/tts?text="${interaction.options.getString("input").substring(0, 1021)} "`)
        
        const resource = createAudioResource(url.request.res.responseUrl)
        const player = createAudioPlayer()

        voiceConnection.subscribe(player)
        // voiceConnection.on(VoiceConnectionStatus.Ready, () => 
        player.play(resource)//)

        voiceConnection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            } catch (error) {
                voiceConnection.destroy();
            }
        });

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
            player.play(getNextResource());
        });
        player.on('idle', () => {
            voiceConnection.destroy();
        })

        interaction.followUp({content: url.request.res.responseUrl, ephemeral: true})
	},
};