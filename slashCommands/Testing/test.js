module.exports = {
    name: 'test',
    description: 'Tests',
    options: [{
        name: 'input',
        type: 'STRING',
        description: 'The input to echo back',
        required: true,
    }, {
        name: 'number',
        type: 'NUMBER',
        description: 'The input number',
        required: true,
    }],
    run: async (client, interaction, options) => {
        console.log(options);
        return interaction.followUp('Hello! ' + options[0].value + ' ' + options[1].value);
        
    }
}