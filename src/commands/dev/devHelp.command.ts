import {Command} from "../../typings";

const cmd : Command = {
    name: '개발자도움말',
    aliases: ['devhelp'],
    async run(client, msg) {
        const embed = msg.embed()
        embed.setTitle('개발자 도움말')
        const categories = Array.from(new Set(client.commands.map(r => r.category)))
        const category = categories.find(r => r === 'dev')
        embed.setDescription('`' + client.commands.filter(r => r.category === category).map(r => r.name).join('` `') + '`')
        return msg.channel.send(embed)
    }
}

export default cmd