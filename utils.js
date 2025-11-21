export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase()}`;
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

export function formatTime(date) {
  if (!date) return '';
  return new Date(date).toLocaleTimeString();
}
