const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const prefix = process.env.prefix;
let color = "#36393f";

const create_mh = require('../../functions/menu.js');

module.exports = {
    name: "help-menu",
    aliases: ['hm'],
    emoji: '🚑',
    description: "Shows all available bot commands, In menu form.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {

        let categories = [];
        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "birthday",
                "owner"
            ];

            const emo = {
                fun: "🎆",
                giveaway: "🎉",
                info: "📻",
                mod: "🔨",
                testing: "🎌",
                utility: ":comet:",
                purge: "🧨",
                admins: "🔑",
                ticket: "🎫",
                counting: "🔢",
                invite: "📱",
                economy: '💰',
            }

            let ccate = [];

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
                //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                let nome = dir.toUpperCase();

                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });

            const embed = new MessageEmbed()
                .setTitle("Help Menu:")
                .setDescription(`>>> My prefix is ${client.prefix}\nUse the menu, or use \`${client.prefix}help [category]\` to view commands base on their category!\nHelp menu made by \`Saajith#6969\``)
                .addFields(categories)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(color);


            let menus = create_mh(ccate);
            return message.channel.send({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );


                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`);

                            if (!file.name) return "No command name.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : '';

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : 'No Description',
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.deferUpdate();

                        return interaction.message.edit({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    };

                };

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    if (client.commands.get(name).hidden) return;


                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : '';

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : 'No Description',
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.channel.send({
                    embeds: [combed]
                })
            };

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                    .setColor("RED");
                return await client.sendEmbed(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await client.sendEmbed(embed);
        }
    },
};