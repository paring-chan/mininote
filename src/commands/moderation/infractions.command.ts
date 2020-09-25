import {Command} from "../../typings";
import {getUserFromMention} from "../../util";

const cmd : Command = {
    name: '경고목록',
    aliases: [],
    async run(client, msg) {
        const data: any = JSON.parse((await client.db('guilds').where('id', msg.guild!.id))[0].warns)
        let user
        let warn
        if (!msg.args[0])
            user = msg.author
        else
            user = getUserFromMention(client, msg.args[0])!
        if (!user) return msg.reply('유저를 찾을 수 없습니다.')
        warn = data[user.id]
        if (!warn.length) {
            return msg.reply('유저에게 경고가 없습니다.')
        }
        const embed = msg.embed()
        embed.setDescription(warn.map((r: any) => `ID: ${r.id} 사유: ${r.reason}`))
        return msg.channel.send(embed)
    }
}

export default cmd
