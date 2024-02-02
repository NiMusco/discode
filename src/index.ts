import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { sequelize } from './database';

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async () => {
  await deployCommands({ guildId: config.DISCORD_GUILD_ID });
  
  try {
    await sequelize.sync();
    console.log("Connected to DB! 💾");

    await deployCommands({ guildId: config.DISCORD_GUILD_ID });
    console.log("Commands deployed on guild.");
  } catch (error) {
    console.error('Error syncing database:', error);
  }

  console.log("Discord bot is ready! 🤖");
  
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
