const dotenv = require('dotenv');
const { Client, Intents, MessageEmbed } = require('discord.js');

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
        let fechaCreacion = new Date(mensaje.author.createdTimestamp)
        let fechaUnion = new Date(mensaje.member.joinedAt)
        let embed = new MessageEmbed();
        embed.setTitle(`Perfil de ${mensaje.author.username}`);
        embed.addField('Apodo en el servidor', mensaje.member.displayName, true);
        embed.addField('Id', mensaje.author.id, true);
        embed.addField('Su cuenta se creo', fechaCreacion.toString());
        embed.addField('Se unio al servidor', fechaUnion.toString());
        embed.setColor(mensaje.member.displayHexColor);
        embed.setThumbnail(mensaje.member.displayAvatarURL());
        embed.setImage('https://google.com/logo.png')
        mensaje.reply({
            embeds: [embed]
        })
    }
});

client.login(process.env.TOKEN);