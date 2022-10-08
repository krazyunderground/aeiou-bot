module.exports = (client, Discord) => {
    const {REST} = require("@discordjs/rest")
    const {Routes} = require("discord.js")
    const token = process.env.AUTH_TOKEN
    const fs = require("fs")

    const commands = []
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"))

    const clientId = process.env.ID

    for(const file of commandFiles){
        const command = require(`../commands/${file}`)
        commands.push(command.data.toJSON())
        client.commands.set(command.name, command)
    }

    const rest = new REST({ version: "10" }).setToken(token)

    async function loadCommands(){
        try {
            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands }
            )

            console.log(`Successfully reloaded ${data.length} application slash commands`)
        } catch (error) {
            console.log(error)
        }
    }

    loadCommands()
}
