export function fetchCountries(name) {
  if (!name) {
    return;
  }
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    // console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}
