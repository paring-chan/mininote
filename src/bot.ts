import {Client, Collection, Message, MessageEmbed} from 'discord.js'
import fs from 'fs'
import path from "path";
import {Command} from "./typings";
import {LavaClient} from "@anonymousg/lavajs";

Message.prototype.embed = function (msg='') {
    return new MessageEmbed().setColor('GREEN').setDescription(msg).setFooter(this.author.tag, this.author.avatarURL({dynamic: true}) || undefined)
}

const config = require('../config.json')

const client = new Client()

client.commands = new Collection()

client.aliases = new Collection()

client.reloadCommands = function () {
    this.commands.clear()
    this.aliases.clear()
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    fs.readdirSync(path.join(__dirname, 'commands')).forEach(dir => {
        const filter = fs.readdirSync(path.join(__dirname, 'commands', dir)).filter(r => r.endsWith('.command.ts') || r.endsWith('.command.js'))
        filter.forEach(f => {
            const cmd: Command = require(path.join(__dirname, 'commands', dir, f)).default
            if (!cmd.perms) cmd.perms = []
            if (!cmd.owner) cmd.owner = false
            this.commands.set(cmd.name, {
                name: cmd.name,
                aliases: cmd.aliases,
                category: dir,
                owner: cmd.owner,
                perms: cmd.perms,
                run: cmd.run
            })
            console.log(`Register command: ${cmd.name}`)
            cmd.aliases.forEach(alias => this.aliases.set(alias, cmd.name))
        })
    })
}

client.reloadCommands()

client.db = require('knex')(config.db)

client.on('ready', () => {
    if (!client.shard) {
        console.error('shard only')
        return process.exit(0)
    }

    client.music = new LavaClient(client, config.nodes)
        .on('nodeSuccess', () => console.log(`Connected to new lavalink node`))
        .on('nodeError', (node, message) => console.log(message))
})

client.on('message', msg => require('./handler').default(client, msg))

client.on('warn', (e) => console.warn(e))

client.on('error', (e) => console.error(e.message))

client.on('debug', (e) => console.debug(e))


client.login(config.token)