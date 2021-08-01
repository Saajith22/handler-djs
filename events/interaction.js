const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            let checker = client.slash_commands.has(interaction.commandName) ? client.slash_commands.get(interaction.commandName) : false;
            if (!checker) return;

            await interaction.defer().catch(e => {});

            const args = [];

            checker.run(client, interaction, args);
        }
    })
}