import Command from "../../structures/Command";
import DiscordClient from "../../structures/Client";

import { Message, MessageEmbed, version } from "discord.js-light";

export default class Invite extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            name: "invite",
            aliases: ["inv"],
            description: "To send link of this bot",
            examples: ['inv'],
            group: "Info",
            cooldown: 3
        })
    }

async exec(message: Message) {

  const embed = new MessageEmbed()
  .setColor("GREEN")
  .addField('Support Links',`[Invite Me](https://discord.com/oauth2/authorize?client_id=937568242594095124&permissions=515869309047&scope=bot)`)
  .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}
