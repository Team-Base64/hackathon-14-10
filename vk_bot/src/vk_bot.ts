import VkBot from'node-vk-bot-api'

export default function VkBotService () {

    const token = 'vk1.a.LHOzBXgnXvdM8uDvXatyjDhHjkQz-hJJ6H4Ui911siwcqOCcOyF6ntApw8BWY3of6tqb0mmlfHZQVuuZfdAWD5tulGHmteDnPnrjf0a7OWLxlHiw7WeUuqm0Rgw2BUsRswUCdQRybIK1LAoK9Rhh3q2grv4t5R9wJpdsI5PBbP_PnEUFYZRrNOdzyN6d0TM9iMeRl7_mWP9LCCXrJoTe4A';
    const bot = new VkBot(token);

    bot.command('/start', (ctx) => {
        ctx.reply('Hello!');
    });

    bot.startPolling();

    console.log(token);
}