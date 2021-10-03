const Discord = require("discord.js");
const client = require("../index");

client.on("ready", async () => {
  const invite = client.generateInvite({
    scopes: ["applications.commands", "bot"],
    permissions: Discord.Permissions.FLAGS.ADMINISTRATOR,
  });

  //console.log(invite);
  
  console.log(client.user.username + " is online!");
});
