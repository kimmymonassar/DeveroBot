function rollDices(): number {
  const rollOne = 1 + Math.floor(Math.random() * 6);
  const rollTwo = 1 + Math.floor(Math.random() * 6);
  return rollOne + rollTwo;
}

export default function playDiceGame(): Record<string, number> {
  const player = rollDices();
  const cpu = rollDices();

  return {
    player,
    cpu,
  };
}
