module.exports = {
    name: 'ping',
    description: 'Shows latency ping!',
    run: async(client, interaction, args) => {
        await interaction.followUp(`Pong: ${client.ws.ping}ms!`)
    }
}