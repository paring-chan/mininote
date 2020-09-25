import {Client, Message, PermissionResolvable} from "discord.js";
import {LavaClient} from '@anonymousg/lavajs'
import Knex from "knex";

export type Command = {
    name: string
    aliases: Array<string>
    owner?: boolean,
    perms?: PermissionResolvable
    run(client: Client, msg: Message) : Promise<any>
}

export type FormattedCommand = {
    name: string
    aliases: Array<string>
    owner: boolean
    perms: PermissionResolvable
    category: string
    run(client: Client, msg: Message) : Promise<any>
}

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, FormattedCommand>
        aliases: Collection<string, string>
        reloadCommands() : void
        music: LavaClient
        db: Knex
    }
    interface Message {
        embed(msg?: string) : MessageEmbed
        args: Array<string>
    }
}
