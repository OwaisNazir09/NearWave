
const http = require("http");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

try {
  const chatGateway = require("./modules/chat/chat.gateway");
  if (chatGateway.init) chatGateway.init(io);
  console.log("Chat gateway loaded");
} catch (err) {
  console.log("Chat gateway not found or failed to load");
}

try {
  const rtcGateway = require("./modules/rtc/rtc.gateway");
  if (rtcGateway.init) rtcGateway.init(io);
  console.log("RTC gateway loaded");
} catch (err) {
  console.log("RTC gateway not found or failed to load");
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`NearWave backend running on http://localhost:${PORT}`);
});
