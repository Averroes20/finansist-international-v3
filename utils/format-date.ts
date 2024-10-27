function formatDate(createdAt: string): string {
  const date = new Date(parseInt(createdAt));
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatTime(createdAt: string): string {
  const date = new Date(parseInt(createdAt));
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export { formatDate, formatTime };
