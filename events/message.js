const Discord = require('discord.js');
const ms = require('ms');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        let prefix = process.env.prefix;
        prefix = `${prefix} `;

        client.prefix = prefix;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (!message.content || !message.content.toLowerCase().startsWith(prefix)) return;
        const cmd = args.shift();
        let command = client.commands.get(cmd);
        if (!command)
            command = client.aliases.get(cmd);

        const db = await client.db;

        if (command) {
            if (command.cooldown) {
                const time = require('humanize-time');

                const cooldown = await db.fetch(`${message.author.id}-${command.name}`);
                if (cooldown) {

                    if (cooldown < Date.now()) {
                        await db.delete(`${message.author.id}-${command.name}`);
                        command.run(client, message, args);
                        return;
                    }

                    return message.channel.send(`**Come on man, I need some sleep! Use this command again in \`${time(cooldown - Date.now())}\`**`);

                } else {
                    command.run(client, message, args);
                    await db.set(`${message.author.id}-${command.name}`, Date.now() + command.cooldown)
                }

            } else if (command.ownerOnly) {
                if(message.author.id != client.owner) return message.reply('This is an owner only command!');
                command.run(client, message, args);
            } else {
                command.run(client, message, args);
            }
        }
    })
}