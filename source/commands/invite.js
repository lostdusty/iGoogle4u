const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  builder: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite this bot to your server"),

  /**
   * @param {import('discord.js').Interaction} interaction
   */
  handle: async (interaction) => {
    if (!interaction.isCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    await interaction.editReply(`https://discord.com/api/oauth2/authorize?client_id=928255814676938783&permissions=2048&scope=applications.commands%20bot`);

  },
};
