import token from "./src/bot";

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
    authToken: token,
    name: "EduCRM test",
    avatar: "https://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message: any, response: any) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
    console.log(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const http = require('http');
const port = 8088;

const webhookUrl = 'https://65f2-46-242-11-218.ngrok-free.app'; // ngrock or this machine url
http.createServer(
    bot.middleware()
).listen(port,
    () => bot.setWebhook(webhookUrl));