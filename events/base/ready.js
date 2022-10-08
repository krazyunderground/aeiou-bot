module.exports = {
    name: "ready",
    once: "true",
    async execute(Discord, client){
        console.log(`Logged in as ${client.user.tag}`)
    }
}