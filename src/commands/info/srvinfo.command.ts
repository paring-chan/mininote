import {Command} from "../../typings";
import moment from 'moment'

export default {
    name: '서버정보',
    aliases: [],
    async run(client, msg) {
        const guild = msg.guild!
        const embed = msg.embed()
        embed.setTitle(`서버 정보 - ${guild.name}`)
        embed.addField('이름', guild.name, true)
        embed.addField('ID', guild.id, true)
        embed.addField('서버 주인', guild.owner!.user.toString(), true)
        embed.addField('서버 지역', guild.region, true)
        embed.addField('서버 생성일', moment(guild.createdAt).format('YYYY년 MM월 DD일 hh시 mm분 ss초'), true)
        embed.addField('보안 수준', guild.verificationLevel, true)
        embed.addField('활성화된 서버 기능', guild.features.join(', '), true)
        embed.addField('멤버 수', `전체: ${guild.memberCount}
유저: ${guild.members.cache.filter(r => !r.user.bot).size}
봇: ${guild.members.cache.filter(r => r.user.bot).size}
온라인: ${guild.members.cache.filter(r => r.user.presence.status === 'online').size}
자리 비움: ${guild.members.cache.filter(r => r.user.presence.status === 'idle').size}
다른 용무중: ${guild.members.cache.filter(r => r.user.presence.status === 'dnd').size}
오프라인: ${guild.members.cache.filter(r => r.user.presence.status === 'offline' || r.presence.status === 'invisible').size}`, true)
        embed.addField('잠수 채널', guild.afkChannel?.toString() || '없음', true)
        embed.addField('부스트 레벨', guild.premiumTier, true)
        embed.addField('부스트 횟수', guild.premiumSubscriptionCount, true)
        embed.setThumbnail(guild.iconURL({size: 4096})!)
        await msg.channel.send(embed)

        if (guild.splash) {
            const splash = msg.embed().setTitle('이 서버의 초대 배경')
            splash.setImage(guild.splashURL({size: 4096})!)
            await msg.channel.send(splash)
        }

        if (guild.banner) {
            const banner = msg.embed().setTitle('이 서버의 배너')
            banner.setImage(guild.bannerURL({size: 4096})!)
            await msg.channel.send(banner)
        }
    }
} as Command