import {Command} from "../../typings";
import {getUserFromMention} from "../../util";

const cmd : Command = {
    name: '경고취소',
    aliases: [],
    perms: ['ADMINISTRATOR'],
    async run(client, msg) {
        if (!msg.args.length) return msg.reply('노트야 경고 [멘션] [경고 id]')

        const data: any = JSON.parse((await client.db('guilds').where('id', msg.guild!.id))[0].warns)

        const mention = getUserFromMention(client, msg.args[0])

        if (!mention) return msg.reply('노트야 경고 [멘션] [경고 id]')

        const u = msg.guild!.member(mention.id)

        if (!data[u!.id]) {
            data[u!.id] = []
        }

        msg.args.shift()

        const idx = data[u!.id].find((r: any) => r.id === msg.args[1])

        if (idx === -1) return msg.reply('일치하는 경고가 없습니다.')

        data[u!.id].splice(idx,1)

        await client.db('guilds').update({warns: JSON.stringify(data)}).where('id', msg.guild!.id)

        const embed = msg.embed()
        embed.addField('유저', u!.user.toString())
        embed.addField('ID', msg.args[0])
        return msg.channel.send(embed)
    }
}

export default cmd
