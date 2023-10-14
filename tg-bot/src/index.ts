const {Telegraf} = require('telegraf');
const {message} = require('telegraf/filters');

const tokens =
    [
        '1064016468:AAEaJJWW0Snm_sZsmQtgoEFbUTYj6pM60hk',
        '1290980811:AAEgopVWqb7o0I72cwdIGGZRsRyE0GGNkLA',
    ];

class Bots {
    bots;
    context;

    constructor(tokens) {
        this.bots = [];
        this.context = new Map<string, object>();
        this.createBots(tokens);
        this.initBots();
    }

    createBots(tokens) {
        tokens.forEach((token) => {
            this.bots.push(new Telegraf(token));
        });
    }

    initBots() {
        this.bots.forEach((bot, userID) => {
            bot.start((ctx) => {
                // this.ctx.push()
                ctx.reply('Run /addClass command');
                this.context.set(userID.toString(), ctx);
                // console.log(ctx.botInfo);
                // console.log(ctx.update); // update info
                // console.log(ctx.state); // empty -_-
            });
            bot.help((ctx) => ctx.reply('Run /addClass command to send me a token from your teacher!'));
            bot.command('addClass', Telegraf.reply('token'));
            bot.hears('hi', this.sendMessage);
        });
    }

    startBots() {
        this.bots.forEach((bot, userID) => {
            bot.launch();

            process.once('SIGINT', () => bot.stop('SIGINT'));
            process.once('SIGTERM', () => bot.stop('SIGTERM'));
        });
    }

    sendMessage(ctx) {
        console.log(ctx);
        ctx.reply('File content at: ' + new Date() + ' is: lol\n');
    }
}

interface Message {
    id: number,
    text: string,
    time?: number
}

class Net {
    bots;

    constructor(tokens) {
        this.bots = new Bots(tokens);
    }

    sendMessageFromClient(message: Message) {

    }

    sendMessageToClient(message: Message) {

    }
}

const botsService = new Bots(tokens);
botsService.startBots();
