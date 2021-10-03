module.exports = {
    name: 'ping2',
    description: 'Shows latency ping!',
    run: async(client, interaction) => {
        await interaction.followUp(`Pong: ${client.ws.ping}ms!`)
    }
}