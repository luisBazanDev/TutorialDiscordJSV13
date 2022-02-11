const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');

dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
});

client.once('ready', () => {
    console.log('Estoy listo!');
});

client.on('messageCreate', mensaje => {
    if (mensaje.content === 'ping') {
        mensaje.reply('pong');
    }
});

client.login(process.env.TOKEN);