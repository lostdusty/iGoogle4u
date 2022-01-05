const { SlashCommandBuilder } = require("@discordjs/builders");
const { searchOnGoogle } = require("../services/google-search");

module.exports = {
  builder: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search something on Google")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The query to search for")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Send the result in a private message")
    )
    .addBooleanOption((option) =>
      option
        .setName("show-embed")
        .setDescription("Do not hide the embed from the link")
    ),

  /**
   * @param {import('discord.js').Interaction} interaction
   */
  handle: async (interaction) => {
    if (!interaction.isCommand()) return;

    await interaction.deferReply({
      ephemeral: Boolean(interaction.options.get("ephemeral")?.value),
    });

    const query = interaction.options.get("query", true);
    const showEmbed = interaction.options.get("show-embed");

    await interaction.editReply(`Searching for "${query.value}" on Google...`);

    await searchOnGoogle(query.value).then(async (result) => {
      await interaction.editReply({
        content: result.organic_results
          .map(
            (result, index) =>
              `**${index + 1}**. [${result.title}](${
                Boolean(showEmbed?.value) === true
                  ? result.link
                  : `<${result.link}>`
              })`
          )
          .join("\n\n"),
      });
    });
  },
};
