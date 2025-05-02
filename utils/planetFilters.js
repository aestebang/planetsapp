export const filterPlanetsBySearch = (planets, searchText) => {
  if (!searchText) return planets;
  return planets.filter(planet => 
    planet.englishName.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const filterPlanetsByFavorites = (planets, isFavorite) => {
  return planets.filter(planet => isFavorite(planet.id));
};

export const filterPlanets = (planets, searchText, showOnlyFavorites, isFavorite) => {
  let filteredPlanets = filterPlanetsBySearch(planets, searchText);
  if (showOnlyFavorites) {
    filteredPlanets = filterPlanetsByFavorites(filteredPlanets, isFavorite);
  }
  return filteredPlanets;
};