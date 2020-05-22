// Requirements for js file 
// ===================================
const Discord = require('discord.js')
const {
    prefix,
    token,

} = require('./config.json')
const ytdl = require('ytdl-core')

// ===================================

// global variables
const talkedRecently = new Set()

// login with credentials(token)
const client = new Discord.Client() 
client.login(token)

client.once('ready', () => {
    console.log('Ready!')
})
client.once('reconnecting', () => {
    console.log('Reconnecting!')
})
client.once('disconnect', () => {
    console.log("Disconnecting!")
})

// Reads messages and writes into this function (saves messages)
client.on('message', message => {
    if (message.author.bot) 
        return;
    if (!message.content.startsWith(prefix))
        return;
    
    // commands
    if (message.content === "!dame") {
        if (talkedRecently.has(message.author.id))
            cooldownMsg(message)
        else {
            dame(message)
            cooldownLong(message)
        }
    }
})

function dame(message) {    
    message.channel.send({
        files: ['./damedane.wav']
    })
    console.log('Dame command sent...')
}

function cooldownMsg(message) {
    message.channel.send("on cooldown")
}

function cooldownLong(message) {
    talkedRecently.add(message.author.id)
    setTimeout(() => {
        talkedRecently.delete(message.author.id)
    }, 60000);
}