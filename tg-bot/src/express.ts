'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {Telegraf} = require('telegraf');
const {message} = require('telegraf/filters');

const app = express();
const publicFolder = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev'));
app.use(express.static(publicFolder));
app.use(express.json());

const port = process.env.PORT || 8082;

const basePath = '127.0.0.1:8080';

// class Request {
//     /**
//      * Метод, реализующий http-запрос.
//      * @param url - адрес, на который будет посылаться запрос
//      * @param options - параметры запроса
//      * @returns промис запроса
//      */
//     makeRequest = (url: string, options: object) => {
//         return fetch(url, options).then((response) => response.ok ?
//             response.json().then((data) => [response.status, data, response.headers]) :
//             [response.status, response.body, response.headers]).catch((error) => [500, error]);
//     };
//
//     /**
//      * Метод, реализующий запрос GET.
//      * @param url - путь URL
//      * @returns - промис запроса
//      */
//     makeGetRequest = async (url: string) => {
//         const options = {
//             method: 'get',
//             credentials: 'include',
//         };
//         return this.makeRequest(`${basePath}/${url}`, options);
//     };
// }

const tokens =
    [
        '1064016468:AAEaJJWW0Snm_sZsmQtgoEFbUTYj6pM60hk',
        '1290980811:AAEgopVWqb7o0I72cwdIGGZRsRyE0GGNkLA',
    ];

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
    chatid: number,
    text: string,
    time?: number
}

class Net {
    bots;

    constructor(tokens: Array<string>, chatIDs: Array<number>) {
        this.bots = new Bots(tokens, chatIDs, this.sendMessageToClient);
        // this.bots.launchBots();
    }

    sendMessageFromClient(message: Message) {
        if (this.bots.context.has(message.chatid)) {
            this.bots.sendMessage(this.bots.context.get(message.chatid), message.text);
        } else {
            console.error('sendMessageFromClient error, no such chat id');
        }
    }

    sendMessageToClient(message: Message) {
        if (message.chatid !== undefined) {
            console.log('sendMessageToClient, text:', message.text);
            fetch(basePath+'/recieve', {body: JSON.stringify(message)});
        } else {
            console.error('sendMessageToClient error, no such chat id');
        }
    }
}

const net = new Net(tokens, [1, 2]);
// app.get('/init', (req, res) => {
//     net = new Net(tokens, req.body.id);
//     net.bots.launchBots();
//     // res.sendFile(path.resolve(`${publicFolder}/index.html`));
// });

app.post('/recieve', (req, res) => {
    console.log(req.body);
    // console.log(res.json({requestBody: req.body}));
    net.sendMessageFromClient({chatid: req.body.chatid, text: req.body.message});
});

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
