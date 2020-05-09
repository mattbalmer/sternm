export const createQueryString = (query) => {
  const params = new URLSearchParams('');
  Object.keys(query).forEach(key => {
    const value = query[key];
    params.set(key, value);
  });
  return params.toString();
};
