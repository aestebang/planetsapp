import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const toggleFavorite = async (planetId) => {
    try {
      const newFavorites = favorites.includes(planetId)
        ? favorites.filter(id => id !== planetId)
        : [...favorites, planetId];
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error al guardar favorito:', error);
    }
  };

  const isFavorite = (planetId) => {
    return favorites.includes(planetId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};