import {Command} from "../../typings";
import {getUserFromMention} from "../../util";

const cmd : Command = {
    name: '추방',
    aliases: [],
    perms: ['MANAGE_CHANNELS'],
    async run(client, msg) {
        if (msg.args.length < 1) {
            return msg.reply('노트야 추방 <유저> [사유]')
        }
        const u = msg.guild!.member(getUserFromMention(client, msg.args[0])?.id!)
        msg.args.shift()
        if (!u)
            return msg.reply('유저를 찾을 수 없습니다.')
        if (u.hasPermission('ADMINISTRATOR'))
            return msg.reply('관리자를 추방할 수 없습니다.')
        await u.kick(msg.args.join(' '))
        return msg.react('✅')
    }
}

export default cmd
