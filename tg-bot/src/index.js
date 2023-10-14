var Telegraf = require('telegraf').Telegraf;
var message = require('telegraf/filters').message;
var tokens = [
    '1064016468:AAEaJJWW0Snm_sZsmQtgoEFbUTYj6pM60hk',
    '1290980811:AAEgopVWqb7o0I72cwdIGGZRsRyE0GGNkLA',
];
var Bots = /** @class */ (function () {
    function Bots(tokens) {
        this.bots = [];
        this.createBots(tokens);
    }
    Bots.prototype.createBots = function (tokens) {
        var _this = this;
        tokens.forEach(function (token) {
            _this.bots.push(new Telegraf(token));
        });
    };
    Bots.prototype.initBots = function () {
        this.bots.forEach(function (bot) {
            bot.start(function (ctx) { return ctx.reply('Welcome'); });
            bot.help(function (ctx) { return ctx.reply('Send me a sticker'); });
            bot.hears('hi', function (ctx) { return ctx.reply('Hey there'); });
            bot.launch();
            process.once('SIGINT', function () { return bot.stop('SIGINT'); });
            process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
        });
    };
    return Bots;
}());
var bot = new Telegraf(tokens[0]);
bot.start(function (ctx) { return ctx.reply('Welcome'); });
bot.help(function (ctx) { return ctx.reply('Send me a sticker'); });
bot.on(message('sticker'), function (ctx) { return ctx.reply('👍'); });
bot.hears('hi', function (ctx) { return ctx.reply('Hey there'); });
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
