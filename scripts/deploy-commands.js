const { REST, Routes } = require("discord.js");
const {
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
  DISCORD_TOKEN,
} = require("../src/config");

const { load } = require("../src/commands");

const commands = [];
load()
  .map((command) => command.data.toJSON())
  .map((json) => commands.push(json));

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    const route = Routes.applicationGuildCommands(
      DISCORD_CLIENT_ID,
      DISCORD_GUILD_ID
    );
    const data = await rest.put(route, { body: commands });
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
