// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  var channel = client.channels.get('422249550527594496');
  channel.send(`Loading configs was **successful**! :stuck_out_tongue_winking_eye: Bot has started, with ${client.users.size} users, in ${client.channels.size} channels for **ProjectAce**.`);
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`ProjectAce | On ${client.guilds.size} server`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildMemberAdd", member => { member.sendMessage("**Click or tap the image to view in full size** https://goo.gl/grhBsG");});
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`:ping_pong: **Pong!** Latency is __${m.createdTimestamp - message.createdTimestamp}ms.__ API Latency is __${Math.round(client.ping)}ms__`);
  }
  
    if(command === "reboot") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("**Rebooting!** :wilted_rose: ");
    m.edit(`**Reboot successfully completed!** :rose: `);
  }
  
    if(command == "membercount") {
    const m = await message.channel.send("**ProjectAce** a Revolution")
    m.edit(` **Members:** ${client.users.size} | **Channels:**  ${client.channels.size} channels | *~ProjectAce a Revolution - Start shopping today!* :shopping_cart: `)
  }

  if(command == "server") {
    const m = await message.channel.send("**ProjectAce** a Revolution")
    m.edit(` **Members:** ${client.users.size} | **Channels:**  ${client.channels.size} channels | *~ProjectAce a Revolution - Start shopping today!* :shopping_cart: `)
  }
  
  if(command === "help") {
  const embed = {
    "color": 0x00ffff,
 "footer": {
     "text": "Associated with ProjectAce"
 },
 "fields": [
     {
     "name": "Help",
     "value": "This bot is private!",
     "inline": true
     }
 ],
 "thumbnail": {
      "url": message.author.avatarURL
 }
};
message.channel.send({embed});
 }
});

client.login(process.env.BOT_TOKEN);
