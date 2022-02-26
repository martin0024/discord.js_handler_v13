const { CommandInteraction, Client } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
    name: "ping",
    description: "Voir la latence du bot.",
    permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],

    run: async (client, interaction, args) => {
        await interaction.editReply(
            `🏓 La latence du bot est ${Math.round(client.ws.ping)}ms.`
        );
    },
};
