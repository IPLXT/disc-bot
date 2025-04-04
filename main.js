const { Client, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

const TOKEN = process.env['MTIzNzAyOTg2NDgwNDk3ODY4OQ.GivStq.fe8iFNlDB1ZGJE16qqjSGuY2t7kMQ28iWmWzOs']; // Store your token in Replit's Secrets

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Register the slash command
const command = new SlashCommandBuilder()
  .setName('msg')
  .setDescription('Send a message in an embed')
  .addStringOption(option =>
    option.setName('message')
      .setDescription('The message to send')
      .setRequired(true)
  );

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'msg') {
    const messageContent = interaction.options.getString('message');

    // Create the embed
    const embed = new EmbedBuilder()
      .setColor('#0099ff') // Blue color (you can change this)
      .setTitle('Message')
      .setDescription(messageContent)
      .setTimestamp()
      .setFooter({ text: `Sent by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    // Reply with the embed
    await interaction.reply({ embeds: [embed] });
  }
});

// Login to Discord
client.login(TOKEN);

// Keep the bot alive with a simple web server (for Replit)
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

// Register the command when the bot starts
client.once('ready', async () => {
  try {
    await client.application.commands.set([command.toJSON()]);
    console.log('Slash command registered!');
  } catch (error) {
    console.error('Error registering command:', error);
  }
});
