/**
 * Hook personalizado para manejar la funcionalidad de planetas favoritos.
 * Proporciona funciones para cargar, guardar y gestionar los planetas favoritos
 * utilizando AsyncStorage para la persistencia de datos.
 * @returns {Object} Objeto con funciones y estado para manejar favoritos
 */
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  /**
   * Carga los planetas favoritos almacenados en AsyncStorage
   */
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Alterna el estado de favorito de un planeta
   * @param {string} planetId - ID del planeta a alternar
   */
  const toggleFavorite = async (planetId) => {
    try {
      const newFavorites = favorites.includes(planetId)
        ? favorites.filter((id) => id !== planetId)
        : [...favorites, planetId];

      setFavorites(newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };

  /**
   * Verifica si un planeta está marcado como favorito
   * @param {string} planetId - ID del planeta a verificar
   * @returns {boolean} true si el planeta es favorito, false en caso contrario
   */
  const isFavorite = (planetId) => {
    return favorites.includes(planetId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loadFavorites,
  };
};
