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
