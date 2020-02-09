export default url => {
  return decodeURI(url)
    .replace("?", "")
    .split("&")
    .map(param => param.split("="))
    .reduce((values, [key, value]) => (values[key] = value), {});
};
