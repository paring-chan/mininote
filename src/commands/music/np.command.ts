import {Command} from "../../typings";

const cmd : Command = {
    name: '현재곡',
    perms: [],
    aliases: [],
    async run(client, msg) {
        const player = await client.music.playerCollection.get(msg.guild!.id);

        if (!player || !player.queue.get(1))
            return msg.channel.send('재생중인 곡이 없어요!');
        const track = player.queue.get(1)!
        const embed = msg.embed()
        embed.setTitle(track.title)
        embed.setImage(`https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`)
        await msg.channel.send(embed)
    }
}

export default cmd
