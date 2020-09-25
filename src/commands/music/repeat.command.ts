import {Command} from "../../typings";

const cmd: Command = {
    name: '반복',
    aliases: [],
    async run(client, msg) {
        const player = await client.music.playerCollection.get(msg.guild!.id);
        if (!player)
            return await msg.channel.send('재생중인 곡이 없어요!');

        switch (msg.args[0]) {
            case '곡':
                return msg.reply(`곡 반복이 ${player.queue.toggleRepeat('track') ? '활성화' : '비활성화'} 되었습니다.`)

            case '대기열':
                return msg.reply(`대기열 반복이 ${player.queue.toggleRepeat('queue') ? '활성화' : '비활성화'} 되었습니다.`)

            default:
                return msg.reply('노트야 반복 <곡/대기열>')
        }
    }
}

export default cmd
