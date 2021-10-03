const chalk = require("chalk");
const fs = require("fs");
const { readdirSync } = fs;
const client = require("../index");

const slashCommands = [];

//SLASH COMMANDS
console.log(chalk.blue.bold("SLASH COMMANDS 🟢"));
readdirSync("./slashCommands").forEach(async (dir) => {
  const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  commands.map(async (cmd) => {
    let file = require(`../slashCommands/${dir}/${cmd}`);

    let name = file.name || "No command name.";
    let description = file.description || "No description.";

    const data = {
      name,
      description,
    };

    let option = name == "No command name." ? "❌" : "✅";

    console.log(`Loaded Slash Command ${option} | ${name}`);

    if (option == "✅") {
      client.slash_commands.set(name, {
        ...data,
        run: file.run,
      });

      slashCommands.push(data);
    }
  });
});

client.guilds.fetch("801843417154846720").then(async (g) => {
  if (client.isReady()) {
    await g.commands.set(slashCommands);
    console.log(chalk.green.blue.bold("Commands set!"));
  } else {
    setTimeout(async () => {
      await g.commands.set(slashCommands);
      console.log(chalk.green.blue.bold("Commands set!"));
    }, 3100);
  }
});

console.log("-".repeat(30));
