import {Command} from "../../typings";
import {TextChannel} from "discord.js";

const cmd : Command = {
    name: '청소',
    aliases: [],
    perms: ['MANAGE_CHANNELS'],
    async run(client, msg) {
        const n = Number(msg.args[0])
        if (msg.args.length !== 1 || isNaN(n) || n > 100 || n < 1) {
            return msg.reply('노트야 청소 <1~100>')
        }
        await msg.delete()
        const cnt = (await (<TextChannel>msg.channel).bulkDelete(n)).size
        return msg.reply(`메시지 ${cnt}개 삭제됨`)
    }
}

export default cmd
