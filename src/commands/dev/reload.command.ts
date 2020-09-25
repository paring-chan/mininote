import {Command} from "../../typings";

const cmd : Command = {
    name: '리로드',
    owner: true,
    aliases: [],
    async run(client, msg) {
        client.reloadCommands()
        return msg.channel.send(msg.embed('리로드 끝'))
    }
}

export default cmd
