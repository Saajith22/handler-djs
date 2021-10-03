const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageAttachment,
  Collection,
} = require("discord.js");

const Canvas = require("canvas");
const canvas = Canvas.createCanvas(600, 500);
const ctx = canvas.getContext("2d");

module.exports = {
  name: "ping",
  description: "Server icon with ping!",
  //type: "SUB_COMMAND",
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Array} options
   */
  run: async (client, interaction, options) => {
    const guild = interaction.guild;

    console.log("Running");

    const attach = new MessageAttachment(
      await circleImage(Canvas, canvas, ctx, {
        guild: guild.iconURL({ dynamic: false, format: "png" }),
        ping: 'C:\\Users\\saaji\\OneDrive\\Desktop\\Dank-Dreamer\\images\\ping.png'
      })
    );

    return interaction.followUp({
      files: [attach],
    });
  },
};

/**
 *
 * @param {Canvas} Canvas
 * @param {canvas} canvas
 * @param {ctx} ctx
 * @param {String} image
 * @returns
 */
const circleImage = async (Canvas, canvas, ctx, image) => {
  const img = await Canvas.loadImage(image.guild);
  const img2 = await Canvas.loadImage(image.ping);

  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 2,
    0,
    Math.PI - 0.5
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img2, 460, 280, 200, 200);

  return canvas.toBuffer();
};
