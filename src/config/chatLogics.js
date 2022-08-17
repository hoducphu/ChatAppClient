export function isSameSender(messages, m, i, userId) {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
}

export function isLastMessage(messages, i, userId) {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
}

export function isUser(senderId, userId) {
  return senderId === userId;
}

export function marginMessage(messages, m, i, userId) {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 5;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 1;
  else return "auto";
}

export function isSameUser(messages, m, i) {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
}
