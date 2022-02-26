const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message,
} = require("discord.js");

const wait = require("util").promisify(setTimeout);

module.exports = {
    name: "clear",
    description: "Supprimer des messages dans le channel !",
    permissions: [""],
    type: 1,
    options: [
        {
            name: "nombre",
            description: "indique ton nombre",
            required: true,
            type: 3,
        },
    ],

    run: async (client, interaction, args) => {
        let count = args;
        if (
            !count ||
            isNaN(args) ||
            !Number.isInteger(Number(args)) ||
            args > 99 ||
            args < 2
        )
            return interaction.followUp("Le nombre est invalide");
        let channel = await interaction.channel
            .bulkDelete(Number(args) + 1)
            .catch((err) => {});
        if (!channel) return;
        let msg = await interaction.channel.send(
            `✅ J'ai supprimer ${count} messages.`
        );
    },
};
