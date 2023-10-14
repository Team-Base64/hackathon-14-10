const {Telegraf} = require('telegraf');
const {message} = require('telegraf/filters');

const tokens =
    [
        '1064016468:AAEaJJWW0Snm_sZsmQtgoEFbUTYj6pM60hk',
        '1290980811:AAEgopVWqb7o0I72cwdIGGZRsRyE0GGNkLA',
    ];

class Bots {
    bots;

    constructor(tokens) {
        this.bots = [];
        this.createBots(tokens);
    }

    createBots(tokens) {
        tokens.forEach((token) => {
            this.bots.push(new Telegraf(token));
        });
    }

    initBots() {
        this.bots.forEach((bot) => {
            bot.start((ctx) => ctx.reply('Welcome'));
            bot.help((ctx) => ctx.reply('Send me a sticker'));
            bot.hears('hi', (ctx) => ctx.reply('Hey there'));
            bot.launch();

            process.once('SIGINT', () => bot.stop('SIGINT'));
            process.once('SIGTERM', () => bot.stop('SIGTERM'));
        });
    }
}

const botsSeervice = new Bots(tokens);

botsSeervice.initBots();

// const bot = new Telegraf(tokens[0]);
// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();
//
// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));
