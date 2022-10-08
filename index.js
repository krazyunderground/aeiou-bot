require("dotenv").config()
const Discord = require("discord.js")

// const { QuickDB } = require("quick.db");
// const db = new QuickDB();

const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],   
    intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildVoiceStates
    ]
})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

async function loadHandlers(){
    const handlers = ["command_handler", "event_handler"]
    handlers.forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord)
    })

}

loadHandlers()
client.login(process.env.AUTH_TOKEN)