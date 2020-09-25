import {Command} from "../../typings";
import fetch from 'node-fetch'

const cmd : Command = {
    name: '마크스킨',
    aliases: [],
    perms: [],
    async run(client, msg) {
        if (msg.args.length !== 1) return msg.reply('노트야 마크스킨 <닉네임>')
        let u
        try {
            u = await fetch(`https://api.mojang.com/users/profiles/minecraft/${msg.args[0]}`).then(r => r.json())
        } catch (e) {
            return msg.reply('유저를 찾을 수 없습니다.')
        }
        if (!u) return msg.reply('유저를 찾을 수 없습니다.')

        return msg.reply(msg.embed().setTitle('마인크래프트 스킨 - ' + u.name)
            .setImage(`https://visage.surgeplay.com/full/1024/${u.id}.png`))
    }
}

export default cmd
