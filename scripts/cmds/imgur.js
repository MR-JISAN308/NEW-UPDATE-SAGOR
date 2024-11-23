const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/ARYAN-STORE/ARYAN-ALL-API/refs/heads/main/api.json`,
  );
  return base.data.api;
};

(module.exports.config = {
  name: "imgur",
  version: "6.9",
  credits: "dipto & ArYAN",
  countDown: 5,
  hasPermssion: 0,
  usePrefix: true,
  prefix:true,
  commandCategory: "media",
  category: " media",
  description: "convert image/video into Imgur link",
  usages: "reply [image, video]",
}),
  (module.exports.run = async function ({ api, event }) {
    const ArYan = event.messageReply?.attachments[0]?.url;
    if (!ArYan) {
      return api.sendMessage(
        "Please reply to an image or video.",
        event.threadID,
        event.messageID,
      );
    }
    try {
      const res = await axios.get(
        `${await baseApiUrl()}/imgur?url=${encodeURIComponent(ArYan)}`,
      );
      const ArYan2 = res.data.data;
      api.sendMessage(ArYan2, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        "Failed to convert image or video into link.",
        event.threadID,
        event.messageID,
      );
    }
  });
