module.exports = {
    name: 'test',
    description: 'Tests',
    run: async (client, interaction, args) => {
        return interaction.followUp('Hello!')
    }
}