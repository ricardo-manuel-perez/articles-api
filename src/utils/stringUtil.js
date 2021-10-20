module.exports.slugify = (title) => {
  const spacesRegex = /\s+/g;
  const tokens = title.split(spacesRegex);
  const slug = tokens.join("-");

  return slug;
};
