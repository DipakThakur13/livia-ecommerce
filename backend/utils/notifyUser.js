const webpush = require("web-push");
const User = require("../models/user");

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendNotification = async (userId, message) => {
  const user = await User.findById(userId);
  if (!user || !user.pushSubscription) return;

  webpush.sendNotification(user.pushSubscription, JSON.stringify({ title: "Order Update", body: message }));
};

module.exports = sendNotification;
