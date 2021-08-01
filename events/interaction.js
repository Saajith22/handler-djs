const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            let checker = client.slash_commands.get(interaction.commandName);
            if (!checker) return;

            await interaction.defer().catch(e => {});

            const args = [];

            options: [{
                    name: 'input',
                    type: 'STRING',
                    description: 'The input to echo back',
                    required: true,
                }],

                checker.run(client, interaction, args);
        }
    })
}