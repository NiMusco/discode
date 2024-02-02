import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import User from '../models/user'; // Adjust the path as necessary

export const data = new SlashCommandBuilder()
  .setName("register")
  .setDescription("Register a user in the database")
  .addUserOption(option =>
    option.setName("user")
      .setDescription("The user to register")
      .setRequired(true))

export async function execute(interaction: CommandInteraction) {
  const userOption = interaction.options.getUser("user");

  if (userOption) {
    const discordUserId = userOption.id;
    const joinDate = new Date();

    try {
      await User.create({ discordUserId, joinDate });
      await interaction.reply(`User <@${discordUserId}> added to the database.`);
    } catch (error) {
      console.error('Error registering user in database:', error);
      await interaction.reply('There was an error while registering the user.');
    }
  } else {
    await interaction.reply("Please mention a user to register.");
  }
}
