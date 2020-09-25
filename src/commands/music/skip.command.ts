import {Command} from "../../typings";
import {GuildMember, TextChannel} from "discord.js";

const cmd: Command = {
    name: '정지',
    aliases: [],
    async run(client, msg) {
        const player = await client.music.playerCollection.get(msg.guild!.id);
        if (!player)
            return msg.channel.send('재생중인 곡이 없어요!');
        if (player.queue.size === 1)
            return await msg.channel.send(
                '스킵할 수 잆는 곡이 없어요!'
            );
        if (player.queue.first.user !== msg.member!)
            return await msg.channel.send(
                `이 곡을 추가한 유저 ${player.queue.first.user.user.tag}만 스킵할 수 있어요!`
            );

        await player.play();
        await msg.react('✅')
    }
}

export default cmd
