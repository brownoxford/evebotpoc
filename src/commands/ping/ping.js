const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

const execute = async (interaction) => {
  console.log(interaction);
  await interaction.reply("Pong!");
};

module.exports = {
  data,
  execute,
};
