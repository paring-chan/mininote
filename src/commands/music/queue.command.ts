import {Command} from "../../typings";
import {GuildMember, TextChannel} from "discord.js";

const cmd: Command = {
    name: '대기열',
    aliases: [],
    async run(client, msg) {
        const player = await client.music.playerCollection.get(msg.guild!.id)
        if (!player) return msg.reply(msg.embed('이 서버에서 재생중인 곡이 없어요!').setColor('RED'))
        return msg.reply(msg.embed().setDescription(
            player.queue.map(track => `${track.title} - ${track.author}`).join('\n')
        ))
    }
}

export default cmd
