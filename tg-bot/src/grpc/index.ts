const {Telegraf} = require('telegraf');


class Bots {
    bots;
    context;
    sendMessageToClient;
    senderChat;

    constructor(tokens: Array<string>, chatIDs: Array<number>, sendMessageToClient: Function) {
        this.bots = [];
        this.context = new Map<number, object>();
        this.senderChat = new Map<number, number>();
        this.sendMessageToClient = sendMessageToClient;
        this.createBots(tokens);
        this.initBots(chatIDs);
    }

    createBots(tokens: Array<string>) {
        tokens.forEach((token) => {
            this.bots.push(new Telegraf(token));
        });
    }

    initBots(chatIDs: Array<number>) {
        this.bots.forEach((bot, index: number) => {
            bot.start((ctx) => {
                // this.ctx.push()
                ctx.reply('Run /addClass command');
                this.context.set(chatIDs[index], ctx);
                this.senderChat.set(ctx.update.message.chat.id, chatIDs[index]);
                // console.log(ctx.botInfo);
                // console.log(ctx.update); // update info
                // console.log(ctx.state); // empty -_-
            });
            bot.help((ctx) => ctx.reply('Run /addClass command to send me a token from your teacher!'));
            bot.command('addClass', Telegraf.reply('token'));
            bot.hears('hi', (ctx) => this.sendMessage(ctx, `date is  ${new Date()}`));

            bot.on(['text'], (ctx) => {
                this.sendMessage(ctx, ctx.message.text);
                this.sendMessageToClient(
                    {
                        id: this.senderChat.get(ctx.update.message.chat.id), text: ctx.message.text,
                    },
                );
            });
        });
        console.log(this.context.entries());
    }

    launchBots() {
        this.bots.forEach((bot) => {
            bot.launch();

            process.once('SIGINT', () => bot.stop('SIGINT'));
            process.once('SIGTERM', () => bot.stop('SIGTERM'));
        });
    }

    sendMessage(ctx, text: string) {
        ctx.reply(text);
    }
}

interface Message {
    chatID: number,
    text: string,
    time?: number
}

export default class Net {
    bots;

    constructor(tokens: Array<string>, chatIDs: Array<number>) {
        this.bots = new Bots(tokens, chatIDs, this.sendMessageToClient);
        this.bots.launchBots();
    }

    sendMessageFromClient(message: Message) {
        if (this.bots.context.has(message.chatID)) {
            this.bots.sendMessage(this.bots.context.get(message.chatID), message.text);
        } else {
            console.error('sendMessageFromClient error, no such chat id');
        }
    }

    sendMessageToClient(message: Message) {
        if (message.chatID !== undefined) {
            console.log('sendMessageToClient, text:', message.text);
        } else {
            console.error('sendMessageToClient error, no such chat id');
        }
    }
}

//export default Net;

// const net = new Net(tokens, [0, 1]);
// setTimeout(() => net.sendMessageFromClient({id: 0, text: 'testing'}), 10000);

// const botsService = new Bots(tokens, [0, 1]);
// botsService.startBots();
