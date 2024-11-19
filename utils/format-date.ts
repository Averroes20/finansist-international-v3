function formatDate(DateTime: string): string {
  const date = new Date(DateTime);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatTime(DateTime: string): string {
  const date = new Date(DateTime);
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatDateTime(DateTime: string): string {
  const date = new Date(DateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export { formatDate, formatTime, formatDateTime };
