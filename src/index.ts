import {ShardingManager} from "discord.js";
import path from "path";
import './typings'

const config = require('../config.json')

const manager = new ShardingManager(path.join(__dirname, 'bot.ts'), {
    execArgv: ['-r', 'ts-node/register'],
    token: config.token
})

manager.on('shardCreate', shard => console.log(`Launched shard #${shard.id}`))

manager.spawn().then(() => {
    console.log('shard spawn complete')
})
