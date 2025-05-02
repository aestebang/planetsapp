import React from 'react';
import { View } from 'react-native';
import FavoritePlanets from '../components/FavoritePlanets';
import usePlanetImages from '../hooks/usePlanetImages';
import useGetAllPlanet from '../hooks/useGetAllPlanet';

export default function Favorites() {
  const { planets } = useGetAllPlanet();
  const images = usePlanetImages(planets?.bodies || []);

  return (
    <View style={{ flex: 1 }}>
      <FavoritePlanets images={images} />
    </View>
  );
}