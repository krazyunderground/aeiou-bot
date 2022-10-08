const fs = require("fs")
const channel = "1015963423030378516"

module.exports = {
    name: "guildCreate",
    async execute(Discord, client, guild) {
        var newDate = new Date()
        dateString = newDate.toUTCString()
        console.log(`${dateString}: New guild joined: ${guild.name} (id: ${guild.id})\nThis guild has ${guild.memberCount} members!`)
        fs.appendFile('./join-log.txt', `${dateString}: Added to Guild: ${guild.name} Id: ${guild.id} Member Count: ${guild.memberCount}\n`, function (err) {
            if (err) throw err;
        })
        client.channels.cache.get(channel).send(`<@576470929874616330>\nNew guild joined: ${guild.name} (id: ${guild.id})\nThis guild has ${guild.memberCount} members!`)
    }
}