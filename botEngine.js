let botRunning = false;

export function startBot() {
  botRunning = true;
  console.log("Bot started");
}

export function stopBot() {
  botRunning = false;
  console.log("Bot stopped");
}

export function isBotRunning() {
  return botRunning;
}
