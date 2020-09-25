import {Command} from "../../typings";
import {GuildMember, TextChannel} from "discord.js";

const cmd: Command = {
    name: '재생',
    aliases: [],
    async run(client, msg) {
        const {channel} = msg.member!.voice;
        if (!channel)
            return msg.channel.send(
                '음성 채널에 들어가주세요!'
            );
        const song = msg.args.join(' ');
        const player = await client.music.spawnPlayer(
            {
                guild: msg.guild!,
                voiceChannel: channel,
                textChannel: <TextChannel>msg.channel,
                volume: 100,
                deafen: true
            },
            {
                skipOnError: true
            }
        );

        let res: any = null
        try {
            res = await player.lavaSearch(encodeURIComponent(song), <GuildMember>msg.member, {
                source: 'yt',
                add: false
            });
        } catch (e) {
            if (e)
                return msg.channel.send(
                    '곡을 찾을 수 없습니다.'
                );
        }

        if (Array.isArray(res!)) {
            player.queue.add(res[0]);
            await msg.channel.send(
                msg.embed().setTitle('곡 추가')
                    .addField('제목', res[0].title)
            );
        }
        else {
            player.queue.add(res!.tracks)
            await msg.channel.send(
                msg.embed().setTitle('곡 추가')
                    .addField('제목', res[0].title)
            )
        }

        if (!player.playing) await player.play();
    }
}

export default cmd
