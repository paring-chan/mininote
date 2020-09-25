import {Command} from "../../typings";
import emojis from "../../emojis";
import {ExecException} from "child_process";
import iconv from 'iconv-lite'

const cmd : Command = {
    name: 'shell',
    aliases: [],
    perms: [],
    owner: true,
    async run(client, msg) {
        const embed = msg.embed()
        const input = msg.args.join(' ').replace(/^```(sh)?/, '')
            .replace(/```$/, '')
        embed.addField('INPUT', '```js\n' + (input.length > 1000 ? input.slice(0,1000) + '...' : input) + '```')
        const m = await msg.channel.send(emojis.loading)
        await new Promise<{error: ExecException | null, stdout: string, stderr: string}>(resolve => {
            require('child_process').exec(input, (error: ExecException | null, stdout: string, stderr: string) => resolve({stdout, stderr, error}))
        }).then(res => {
            let out = iconv.decode(Buffer.from(res.stdout), 'utf8')
            let err = iconv.decode(Buffer.from(res.stderr), 'utf8')
            if (out) {
                if (out.length > 1000) {
                    embed.addField('STDOUT', '```sh\n'+  (out.slice(0,1000) + '...') + '```')
                } else {
                    embed.addField('STDOUT', '```sh\n' + out + '```')
                }
            }
            if (err) {
                if (err.length > 1000) {
                    embed.addField('STDERR', '```sh\n'+  (err.slice(0,1000) + '...') + '```')
                } else {
                    embed.addField('STDERR', '```sh\n' + err + '```')
                }
            }
        })
        return m.edit('', embed)
    }
}

export default cmd
