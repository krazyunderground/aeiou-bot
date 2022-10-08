module.exports = {
    name: "interactionCreate",
    async execute(Discord, client, interaction) {
        if(!interaction.isCommand()) return
        try {
            const cmd = await client.commands.get(interaction.commandName)
            cmd.execute(Discord, client, interaction)
        } catch (error) {
            console.log(error)
            await interaction.reply({content: "There seems to be an issue with this command", ephemeral: true}).catch(() => {
                interaction.editReply({content: "There seems to be an issue with this command", ephemeral: true})
            }).catch((err) => console.log(err))
        }
    }
}