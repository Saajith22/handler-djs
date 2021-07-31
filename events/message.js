const Discord = require('discord.js');

module.exports = {
    name: 'message',
    /**
     * 
     * @param {Discord.Client} client 
     */
    run: (client) => {
        client.on('messageCreate', async (message) => {
            if (message.author.bot) return;
            if (!message.guild) return;

            const prefix = process.env.prefix;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            if (!message.content || !message.content.toLowerCase().startsWith(prefix)) return;
            const command = args.shift();
            const running = client.commands.has(command) ? client.commands.get(command) : false;
            if(running == false) return;
            require(`../commands/${running.dir}/${running.name}`).run(client, message, args, Discord);
        })
    }
}