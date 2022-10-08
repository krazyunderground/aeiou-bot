const fs = require('fs')
const path = require('path')

module.exports = (client, Discord) => {
    const eventsPath = path.resolve(__dirname, '../events')
    const eventsFolders = fs.readdirSync(eventsPath)
    for(const folder of eventsFolders){
        const eventsFiles = fs.readdirSync(`${eventsPath}/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of eventsFiles){
            const event = require(`../events/${folder}/${file}`)
            if(event.once){
                client.once(event.name, (...args) => event.execute(Discord, client, ...args))
            } else {
                client.on(event.name, (...args) => event.execute(Discord, client, ...args))
            }
        }
    }
}