import { Client, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Canvas from 'canvas';
import fetch from 'node-fetch'; // Import node-fetch as an ES module
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Load the image
const baseImagePath = './images/mrkrabs.jpg';
const baseImage = fs.readFileSync(baseImagePath);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register the custom font
const fontPath = path.join(__dirname, 'KrabbyPatty.ttf');
console.log(`Registering font from: ${fontPath}`);
Canvas.registerFont(fontPath, { family: 'Krabby Patty' });

// Your bot token and client ID
const token = '';
const clientId = '';
const guildId = '';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Slash command setup
const commands = [
  {
    name: 'test',
    description: 'Test if the bot is working',
  },
  {
    name: 'since',
    description: 'Add text to an image',
    options: [
      {
        name: 'number',
        type: 4, // INTEGER type
        description: 'A number',
        required: true,
      },
      {
        name: 'text',
        type: 3, // STRING type
        description: 'The text to add to the image',
        required: true,
      },
    ],
  },
  {
    name: 'faq',
    description: 'READ THE FAQ',
  },
  {
    name: 'krabty',
    description: 'summon the krab',
  },
  {
    name: 'questionable',
    description: 'Overlay user info on image',
    options: [
      {
        name: 'user',
        type: 6, // USER type
        description: 'The user to overlay',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'test') { await interaction.reply('The bot is working!'); } 
  else if (commandName === 'since') {
    const number = interaction.options.getInteger('number');
    const text = interaction.options.getString('text');

    // Create a canvas and load the image
    const canvas = Canvas.createCanvas(750, 750);
    const context = canvas.getContext('2d');

    const image = await Canvas.loadImage(baseImage);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Define text style and position
    context.font = '48px Krabby Patty';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';

    // Calculate positions for the text
    const numberText = `${number}`;
    const daysText = 'DAYS WITHOUT';
    const mainText = `${text.toUpperCase()}`;

    context.fillText(numberText, 500, 420);
    context.fillText(daysText, 500, 470);
    context.fillText(mainText, 500, 520);

    // Save the image to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the image in Discord
    const attachment = {
      files: [{ attachment: buffer, name: 'krabs_output_image.png' }],
    };

    await interaction.reply(attachment);
    }
  else if (commandName === 'faq') { 
    // output image faquser.png
    // Create a canvas and load the image
    const canvas = Canvas.createCanvas(506, 838);
    const context = canvas.getContext('2d');

    const image = await Canvas.loadImage('./images/faquser.png');

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Save the image to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the image in Discord
    const attachment = {
      files: [{ attachment: buffer, name: 'faq_output_image.png' }],
    };

    await interaction.reply(attachment);
    }
   else if (commandName === 'krabty') { 
    // output image sabakrabs.png
    // Create a canvas and load the image
    const canvas = Canvas.createCanvas(765, 859);
    const context = canvas.getContext('2d');

    const image = await Canvas.loadImage('./images/sabakrabs.png');

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Save the image to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the image in Discord
    const attachment = {
      files: [{ attachment: buffer, name: 'krabty_output_image.png' }],
    };

    await interaction.reply(attachment);
    }
    else if (commandName === 'questionable') {
        const user = interaction.options.getUser('user');
    
        // Fetch the user's profile picture
        const avatarUrl = user.displayAvatarURL({ format: 'png' });
    
        // Create a canvas and load the base image
        const canvas = Canvas.createCanvas(754, 859);
        const context = canvas.getContext('2d');
    
        const image = await Canvas.loadImage('./images/krabty.jpg');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
        // Load the user's avatar
        const avatar = await Canvas.loadImage(avatarUrl);

        // Draw a circular clipping region
        const avatarSize = 46; // Size of the avatar
        const avatarX = 389.5; // X position
        const avatarY = 174.2; // Y position
        const radius = avatarSize / 2;

        // Draw a circular clipping region
        context.save();
        context.beginPath();
        context.arc(avatarX + radius, avatarY + radius, radius, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        // Draw the avatar within the circular clipping region
        context.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize); // Adjust the X, Y, width, and height as needed
        context.restore();
    
        // Define text style and position for the username
        context.font = 'bold 15px Arial';
        context.fillStyle = '#ffffff';
        context.fillText(user.username, 453, 190); // Adjust the X and Y coordinates as needed
    
        // Save the image to a buffer
        const buffer = canvas.toBuffer('image/png');
    
        // Send the image in Discord
        const attachment = {
          files: [{ attachment: buffer, name: 'output_questionable.png' }],
        };
    
        await interaction.reply(attachment);
      }
});

// Login to Discord with your client's token
client.login(token);