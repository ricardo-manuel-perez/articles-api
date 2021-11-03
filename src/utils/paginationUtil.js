module.exports = {
  getPaginationValues: (page, size) => {
    const limit = size;
    const offset = page * limit;
    return { limit, offset };
  },
  calculateTotalPages: (totalItemsCount, size) => {
    return Math.ceil(totalItemsCount / size) - 1;
  },
};
