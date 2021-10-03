const fs = require("fs");
const { readdirSync } = fs;
const client = require("../index");
const chalk = require("chalk");

console.log("-".repeat(30));

// COMMANDS
console.log(chalk.green.bold("COMMANDS 🟢"));
readdirSync("./commands").forEach(async (dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  commands.map((cmd) => {
    let file = require(`../commands/${dir}/${cmd}`);

    let name = file.name || "No command name.";
    let aliases = file.aliases || [];

    let option = name == "No command name." ? "❌" : "✅";

    if (name != "No command name.") {
      client.commands.set(name, file);
      if (aliases.length < 1) return;
      aliases.forEach((alias) => {
        client.aliases.set(alias, file);
      });
    } else {
      if (aliases.length < 1) return;
      aliases.forEach((alias) => {
        client.aliases.set(alias, file);
      });
    }

    console.log(`Loaded Command ${option} | ${name}`);
  });
});

console.log("-".repeat(30));

//EVENTS
console.log(chalk.yellow.bold("EVENTS 🟢"));
readdirSync("./events").forEach(async (event) => {
  const eventName = event.replace(".js", "");
  require(`../events/${event}`);
  console.log("Loaded Event ✅ | " + eventName);
});

console.log("-".repeat(30));
