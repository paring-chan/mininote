import {Client, Message} from "discord.js";

export default async (client: Client, msg: Message) => {
    const config = require('../config.json')

    const prefix = '노트야 '
    if (!msg.guild || msg.author.bot || !msg.content.startsWith(prefix)) return

    if (!(await client.db('guilds').where('id', msg.guild.id))[0]) {
        await client.db('guilds').insert({id: msg.guild.id})
    }

    const args = msg.content.slice(prefix.length).split(/ +/g)

    const command = args.shift()!

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)!)

    if (!cmd) return

    msg.args = args

    if (!msg.member!.hasPermission(cmd.perms)) {
        return msg.channel.send(msg.embed('이 명령어를 사용하기 위해 필요한 권한이 부족해요!').setColor('RED'))
    }

    if (!config.owners.includes(msg.author.id) && cmd.owner)
        return msg.channel.send(msg.embed('이 명령어는 봇 개발자만 사용할 수 있어요!').setColor('RED'))

    await cmd.run(client, msg)
}