import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

//ie: /welcome user:@nimusco realname:Nicolas Musco description:Nico trabaja en el staff de Sarasa desde 2001 :handshake:. No es ingenerio en Sistemas :pensive: y su helado favorito es el de Dulce de Leche con frutos del :deciduous_tree: Bosque Dork. position:Fullstack DEV

export const data = new SlashCommandBuilder()
  .setName("welcome")
  .setDescription("Welcome a user to the server")
  .addUserOption(option =>
    option.setName("user")
      .setDescription("The user to welcome")
      .setRequired(true))
  .addStringOption(option =>
    option.setName("realname")
      .setDescription("The real name of the user")
      .setRequired(true))
  .addStringOption(option =>
    option.setName("description")
      .setDescription("A brief description of the user")
      .setRequired(true))
  .addStringOption(option =>
    option.setName("position")
      .setDescription("Position title")
      .setRequired(false))

export async function execute(interaction: CommandInteraction) {
  const userOption = interaction.options.getUser("user");
  const realnameOption = interaction.options.get("realname");
  const descriptionOption = interaction.options.get("description");
  const positionOption = interaction.options.get("position");

  if (userOption && realnameOption && descriptionOption) {
    const user = userOption;
    const realname = realnameOption;
    //const description = descriptionOption;
    const position = positionOption;

    const description = `
      ## 🔸Welcome **${realname}!**
      @here <@${user.id}>
      
      ${descriptionOption}
      `;

    // Get the user's avatar URL
    const avatarURL = user.displayAvatarURL();

    // Create a MessageEmbed with the welcome message and avatar
    const embed = new EmbedBuilder()
      .setColor("#FF7417")
      .setDescription(`${description}`)
      .setThumbnail(avatarURL)
      .setFooter({ text: "Don't forget to say hello! 👋" });

    if (position) {
        embed.addFields(
          { name: 'Position', value: position },
        )
      }

    // Send the embed message
    await interaction.reply({ embeds: [embed] });

    // Add reactions to the message
    const message = await interaction.fetchReply();
    await message.react("🧡");
    await message.react("👋");
  } else {
    await interaction.reply("Invalid command usage.");
  }
}