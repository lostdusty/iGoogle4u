const { Client } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { ensureEnvExists } = require("./helpers");
const igoogle4u = require("./commands/igoogle4u");

async function bootstrap() {
  async function registerSlashCommands() {
    const rest = new REST({ version: "9" }).setToken(
      ensureEnvExists("DISCORD_BOT_TOKEN")
    );

    const commands = [igoogle4u.builder.toJSON()];

    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(
        Routes.applicationGuildCommands(
          ensureEnvExists("CLIENT_ID"),
          "609271271250984961"
        ),
        {
          body: commands,
        }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }

  registerSlashCommands();

  const client = new Client({
    intents: ["GUILDS"],
  });

  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "google") {
      igoogle4u.handle(interaction);
    }
  });

  await client.login(ensureEnvExists("DISCORD_BOT_TOKEN"));
}

if (require.main === module) {
  bootstrap();
}
