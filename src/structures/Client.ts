import { Client, IntentsString, Options } from "discord.js-light";
import { BotConfig } from "../utils/client-interface";
import { LavasfyClient } from "lavasfy";
import { Manager } from "erela.js";
import Register from "../class/Register";
import Lavalink from "../class/Lavalink";

import { topgg } from "../utils/client-functions";
import Mongod from "./MongoClient";
import * as Models from "../Models";

declare module "discord.js-light" {
    interface Client {
        config: BotConfig;
        register: Register;
        lavasfy: LavasfyClient;
        manager: Manager;
        erela: Lavalink;
   
        mongo: Mongod;
        model: typeof Models;
    }
}

export default class DiscordClient extends Client {
    constructor(intents: IntentsString[]) {
        super({ intents, makeCache: Options.cacheWithLimits({
            ChannelManager: Infinity, // client.channels
            GuildChannelManager: Infinity, // guild.channels
            GuildManager: Infinity, // client.guilds
            GuildMemberManager: Infinity, // guild.members
            MessageManager: Infinity, // channel.messages
            StageInstanceManager: Infinity, // guild.stageInstances
            UserManager: Infinity, // client.users
            VoiceStateManager: Infinity // guild.voiceStates
        }) });

        this.config = {
            token: process.env.TOKEN as string,
            prefix: process.env.PREFIX as string,
            developers: ["720218422222520410"],
            unknownErrorMessage: false,
            topGG: process.env.TOP_GG as string
        };
        this.erela = new Lavalink(this);
        this.erela.connect();
        this.register = new Register(this);
        this.register.registerAll();
        
        this.mongo = new Mongod();
        this.model = Models
    }

    public async start(): Promise<void> {
        await topgg(this.config.topGG, this);
        await this.mongo.connect();
        await this.login(this.config.token);
    }
}
