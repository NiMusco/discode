import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import User from '../models/user'; // Adjust the path as necessary

export const data = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Retrieve info about a user")
  .addUserOption(option =>
    option.setName("user")
      .setDescription("The user to retrieve info about")
      .setRequired(true));

export async function execute(interaction: CommandInteraction) {
  const userOption = interaction.options.getUser("user");

  if (userOption) {
    const discordUserId = userOption.id;

    try {
      const user = await User.findOne({ where: { discordUserId } });

      if (user) {
        // Create an embed with the user's information
        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(`Information for ${userOption.username}`)
          .addFields(
            { name: 'Discord ID', value: user.discordUserId },
            { name: 'Join Date', value: user.joinDate.toDateString() }
          );

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply(`No information found for user <@${discordUserId}>.`);
      }
    } catch (error) {
      console.error('Error retrieving user from database:', error);
      await interaction.reply('There was an error while retrieving the user info.');
    }
  } else {
    await interaction.reply("Please mention a user to retrieve info.");
  }
}
