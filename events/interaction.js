const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            let cmd = client.slash_commands.get(interaction.commandName);
            if (!cmd) return;

            await interaction.defer().catch(e => {});

            let options = interaction.options._hoistedOptions;

            cmd.run(client, interaction, options);
        }
    })
}