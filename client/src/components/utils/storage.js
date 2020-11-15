export function getFromStorage(key) {
  console.log(localStorage);
  if (!key) {
    return null;
  }
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      console.log(JSON.parse(valueStr));
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}
export function setInStorage(key, obj) {
  if (!key) {
    console.error("Error: Key is missing");
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}
