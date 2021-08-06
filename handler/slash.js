const chalk = require('chalk');
const fs = require('fs');
const {
    readdirSync
} = fs;
const client = require('../index');

//SLASH COMMANDS
console.log(chalk.blue.bold('SLASH COMMANDS 🟢'))
readdirSync('./slashCommands').forEach(async (dir) => {
    const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
        file.endsWith(".js")
    );

    commands.map(async cmd => {
        let file = require(`../slashCommands/${dir}/${cmd}`);

        let name = file.name || "No command name.";
        let description = file.description || "No Description";
        let options = file.options || [];

        const data = {
            name,
            description,
            options
        }

        let option = name == "No command name." ? '❌' : '✅';

        console.log(`Loaded Slash Command ${option} | ${name}`);

        if (option == '✅') {
            setTimeout(async () => {
                client.slash_commands.set(name, {
                    ...data,
                    run: file.run
                });

                client.guilds.fetch('801843417154846720').then(async gui => {
                    await gui.commands.create(data);
                });
            }, 6500);
        }
    });
});

console.log('-'.repeat(30));