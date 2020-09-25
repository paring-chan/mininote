import {Command} from "../../typings";

const cmd : Command = {
    name: '도움말',
    aliases: [],
    async run(client, msg) {
        const embed = msg.embed()
        embed.setTitle('도움말')
        const categories = Array.from(new Set(client.commands.map(r => r.category)))
        categories.filter(r => r !== 'dev').forEach(category => {
            embed.addField(category, '`' + client.commands.filter(r => r.category === category).map(r => r.name).join('` `') + '`')
        })
        return msg.channel.send(embed)
    }
}

export default cmd