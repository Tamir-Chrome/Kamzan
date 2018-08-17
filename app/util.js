
export function mapToJson(map) {
  return JSON.stringify([...map]);
}

export function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

export function mapKeys(map) {
  const keys = [];
  map.forEach((v, k) => {
    keys.push(k);
  });
  console.log(keys);
  return keys;
}
