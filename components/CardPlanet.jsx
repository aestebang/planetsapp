/**
 * Componente principal que muestra una cuadrícula de planetas.
 * Permite filtrar, buscar y ordenar los planetas, así como marcarlos como favoritos.
 * @param {boolean} showOnlyFavorites - Si es true, solo muestra los planetas marcados como favoritos
 */
import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { usePlanets } from "../context/PlanetsContext";
import { useFavorites } from "../hooks/useFavorites";
import { filterPlanets } from "../utils/planetFilters";
import ItemPlanet from "./ItemPlanet";
import AnimationLottie from "./AnimationLottie";
import SearchBar from "./SearchBar";
import cohete from "../assets/animations/Animation-cohete.json";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

const CARD_WIDTH = Dimensions.get("window").width / 2 - 20;

export default function CardPlanet({ showOnlyFavorites = false }) {
  // Estado y hooks para manejar los datos de planetas y favoritos
  const { planetsData } = usePlanets();
  const [searchText, setSearchText] = useState("");
  const { favorites, toggleFavorite, isFavorite, loadFavorites } =
    useFavorites();
  const [sortOrder, setSortOrder] = useState("asc"); // Controla el orden alfabético (ascendente/descendente)

  // Cargar favoritos cuando el componente obtiene el foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Mostrar animación de carga mientras se obtienen los datos
  if (!planetsData) {
    return <AnimationLottie animationData={cohete} />;
  }

  // Filtrar planetas según el texto de búsqueda y si se muestran solo favoritos
  const filteredPlanets = filterPlanets(
    planetsData.bodies,
    searchText,
    showOnlyFavorites,
    isFavorite
  );

  // Ordenar planetas
  const sortedPlanets = [...filteredPlanets].sort((a, b) => {
    const comparison = a.englishName.localeCompare(b.englishName);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar planeta..."
        />
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <Ionicons
            name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
            size={24}
            color="#6EC1E4"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedPlanets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemPlanet
            images={planetsData.images}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
    width: "80%",
  },
  sortButton: {
    padding: 10,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: 10,
  },
});
