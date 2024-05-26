export function parseMessages(data: string) {
  let position = 0;
  const messages = [];

  while (position < data.length) {
      const length = parseInt(data.slice(position, position + 4).trim(), 10);
      const message = data.slice(position + 4, position + 4 + length).trim();
      const parts = message.split(' ');
      const command = parts[0];
      const args = parts.slice(1);

      messages.push({
          length,
          command,
          args
      });

      position += 4 + length;
  }

  return messages;
}