export const defaultLocalDate = (date, format = 'en-US') =>
  new Date(date).toLocaleDateString(format);

export const defaultLocalTime = (date, format = 'en-US') =>
  new Date(date).toLocaleTimeString(format);
