const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝙈𝙍-𝙅𝙄𝙎𝘼𝙉',
      gender: '𝗠𝗔𝗟𝗘',
      whatsapp: '01314470126',
      address: '𝘿𝙃𝘼𝙆𝘼, 𝙉𝘼𝙏𝙊𝙍, 𝘽𝘼𝙉𝙂𝙇𝘼𝘿𝙀𝙎𝙃',
      facebookLink: 'https://www.facebook.com/XAIKO.JISAN?mibextid=ZbWKwL',
      nick: '𝙅𝙄𝙎𝘼𝙉-𝙓𝘼𝙄𝙆𝙊'
    };

    const bold = 'https://i.imgur.com/HlgEFMl.jpeg'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_pic.jpg');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗡𝗧𝗜𝗢𝗡:🧾
𝗡𝗔𝗠𝗘: ${ownerInfo.name}
𝗚𝗘𝗡𝗗𝗘𝗥: ${ownerInfo.gender}
𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣: ${ownerInfo.whatsapp}
𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${ownerInfo.address}
𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: ${ownerInfo.facebookLink}
𝗡𝗜𝗖𝗞𝗡𝗔𝗠𝗘: ${ownerInfo.nick}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
