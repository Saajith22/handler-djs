const fs = require('fs');
const {
    readdirSync
} = fs;
const client = require('../index');
const chalk = require('chalk')

console.log('-'.repeat(30));

console.log(chalk.green.bold('COMMANDS'))
readdirSync('./commands').forEach(async (dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
    );

    const commandFile = commands.map(cmd => {
        let file = require(`../commands/${dir}/${cmd}`);

        if (!file.name) return "No command name.";
        let name = file.name.replace(".js", "");

        return name;
    });

    let command = commandFile;

    if (command.length > 1) {
        command.forEach(cmdd => {
            client.commands.set(cmdd, {
                name: cmdd,
                dir
            });

            console.log('Loaded Command | ' + cmdd);
        });
    } else {
        command = command[0];
        client.commands.set(command, {
            name: command,
            dir
        });

        console.log('Loaded Command | ' + command);
    }
});

console.log('-'.repeat(30));

console.log(chalk.yellow.bold('EVENTS'))
readdirSync('./events').forEach(async (event) => {
    const eventFile = require(`../events/${event}`);
    const eventName = eventFile.name ? eventFile.name : 'No name';

    console.log('Loaded Event | ' + eventName);
    eventFile.run(client)
});

console.log('-'.repeat(30));