/**
 * Convert array to object by specified key
 * @param {object[]} array
 * @param {string} key
 */
const normalize = (array, key) =>
  array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur[key]]: cur,
    }),
    {}
  );

export default normalize;
