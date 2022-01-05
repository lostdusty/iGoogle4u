const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  builder: new SlashCommandBuilder()
    .setName("about")
    .setDescription("About iGoogle4u bot"),

  /**
   * @param {import('discord.js').Interaction} interaction
   */
  handle: async (interaction) => {
    if (!interaction.isCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    await interaction.editReply(`iGoogle4u, a slash command bot to help with your laziness to search in google.\nGithub: https://github.com/PrincessMortix/iGoogle4u\n`);

  },
};
