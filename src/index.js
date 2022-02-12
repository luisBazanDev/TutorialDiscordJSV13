const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');

dotenv.config();
const prefix = "!";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
});

client.once('ready', () => {
    console.log('Estoy listo!');
    client.user.setActivity({
        type: 'STREAMING',
        name: 'Mi servidor de discord',
        url: 'https://twitch.tv/luisbazan'
    })
});

client.on('messageCreate', mensaje => {
    if(!mensaje.content.startsWith(prefix) || mensaje.author.bot)return;

    let argumentos = mensaje.content.trim().split(' ');
    let comando = argumentos.shift().slice(prefix.length);

    if (comando === 'ping') {
        mensaje.reply('pong');
    } else if (comando === 'decir') {
        if(argumentos.length < 1) {
            mensaje.reply('Dime que decir.');
            return;
        }
        mensaje.channel.send(argumentos.join(' '));
        mensaje.delete();
    } else if(comando === 'perfil') {
        mensaje.reply(`Hola ${mensaje.author.username} Tu id es: ${mensaje.author.id}`)
    }
});

client.login(process.env.TOKEN);