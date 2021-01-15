export const linkFormat = (link) => {
  if (
    link.split(':')[0].includes('http') ||
    link.split(':')[0].includes('https')
  ) {
    return link;
  } else {
    return `http://${link}`;
  }
};

export const formatDate = (date) => {
  const monthOnly = date.slice(0, 10);
  return monthOnly.split('-').reverse().join().replaceAll(',', '/');
};
