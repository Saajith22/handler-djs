const Discord = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {
      console.log(e);
    });

    let cmd = client.slash_commands.get(interaction.commandName);
    if (!cmd);

    let options = interaction.options.data;

    cmd.run(client, interaction, options);
  }
});
