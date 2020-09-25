import {Command} from "../../typings";
import emojis from "../../emojis";

const cmd : Command = {
    name: 'eval',
    aliases: [],
    owner: true,
    perms: [],
    async run(client, msg) {
        const embed = msg.embed()
        const input = msg.args.join(' ').replace(/^```(js)?/, '')
            .replace(/```$/, '')
        embed.addField('INPUT', '```js\n' + (input.length > 1000 ? input.slice(0,1000) + '...' : input) + '```')
        const m = await msg.channel.send(emojis.loading)
        embed.addField('OUTPUT', '```js\n' + await new Promise<any>(resolve => resolve(eval(input))).then(res => {
            let r = typeof res === 'string' ? res : require('util').inspect(res)
            if (r.length > 1000) {
                return r.slice(0,1000) + '...'
            } else {
                return r
            }
        }).catch(res => {
            let r = res.message
            if (r.length > 1000) {
                return r.slice(0,1000) + '...'
            } else {
                return r
            }
        }) + '```')
        return m.edit('', embed)
    }
}

export default cmd
