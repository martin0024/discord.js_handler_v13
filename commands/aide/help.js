const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
let config = require("../../settings/config.json");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ["h"],
    permissions: ["SEND_MESSAGES"],
    description: "Une commande pour te guider.",

    run: async (client, message, args, prefix) => {
        try {
            if (!args[0]) {
                let categories = [];

                let ignored = ["owner"];

                const emo = {
                    aide: "❓",
                    other: "🔰",
                };

                readdirSync("./commands/").forEach((dir) => {
                    if (ignored.includes(dir.toLowerCase())) return;
                    const name = `${
                        emo[dir.toLowerCase()]
                    } ${dir.toUpperCase()}`;
                    let cats = new Object();

                    cats = {
                        name: name,
                        value: `\`-> ${prefix}help ${dir.toLowerCase()}\``,
                        inline: true,
                    };

                    categories.push(cats);
                });

                const embed = new MessageEmbed()
                    .setTitle(`Help Menu - Prefix: \`${prefix}\``)
                    .addFields(categories)
                    .setFooter(
                        `Demandé par ${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynamic: true,
                        })
                    )
                    .setTimestamp()
                    .setThumbnail(
                        client.user.displayAvatarURL({
                            dynamic: true,
                        })
                    )
                    .setColor(config.embed.color);

                return message.channel.send({ embeds: [embed] });
            } else {
                let cots = [];
                let catts = [];

                readdirSync("./commands/").forEach((dir) => {
                    if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                    const commands = readdirSync(
                        `./commands/${dir}/`
                    ).filter((file) => file.endsWith(".js"));

                    const cmds = commands.map((command) => {
                        let file = require(`../../commands/${dir}/${command}`);

                        if (!file.name) return "Pas de nom pour la commande.";

                        let name = file.name.replace(".js", "");

                        let des = `${client.commands.get(name).description}`;

                        let obj = {
                            cname: `\`${name}\``,
                            des,
                        };

                        return obj;
                    });

                    let dota = new Object();

                    cmds.map((co) => {
                        dota = {
                            name: `${
                                cmds.length === 0
                                    ? "En developpement."
                                    : co.cname
                            }`,
                            value: co.des ? co.des : "Aucune description.",
                            inline: true,
                        };
                        catts.push(dota);
                    });

                    cots.push(dir.toLowerCase());
                });

                const command =
                    client.commands.get(args[0].toLowerCase()) ||
                    client.commands.find(
                        (c) =>
                            c.aliases &&
                            c.aliases.includes(args[0].toLowerCase())
                    );

                if (cots.includes(args[0].toLowerCase())) {
                    const combed = new MessageEmbed()
                        .setTitle(
                            `Help command - **${
                                args[0].charAt(0).toUpperCase() +
                                args[0].slice(1)
                            }**`
                        )
                        .setDescription(
                            `Utilise \`${prefix}help\` pour avoir plus d'informations sur une commande. \nPar exemple: \`${prefix}help ping\`.\n\n`
                        )
                        .addFields(catts)
                        .setColor(config.embed.color);

                    return message.channel.send({ embeds: [combed] });
                }

                if (!command) {
                    const embed = new MessageEmbed()
                        .setTitle(
                            `Commande introuvable ! \`${prefix}help\` pour avoir toutes les commandes.`
                        )
                        .setColor("RED");
                    return message.channel.send({ embeds: [embed] });
                }

                const embed = new MessageEmbed()
                    .setTitle("Help commande:")
                    .addField(
                        "Command:",
                        command.name
                            ? `\`${command.name}\``
                            : "Pas de nom pour la commande."
                    )
                    .addField(
                        "Aliases:",
                        command.aliases
                            ? `\`${command.aliases.join("` `")}\``
                            : "Aucun alias."
                    )
                    .addField(
                        "Usage:",
                        command.usage
                            ? `\`${prefix}${command.name} ${command.usage}\``
                            : `\`${prefix}${command.name}\``
                    )
                    .addField(
                        "Description:",
                        command.description
                            ? command.description
                            : "Aucune description."
                    )
                    .setFooter(
                        `Demandé par ${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynamic: true,
                        })
                    )
                    .setTimestamp()
                    .setColor(config.embed.color);
                return message.channel.send({ embeds: [embed] });
            }
        } catch (e) {
            console.log(e);
        }
    },
};
