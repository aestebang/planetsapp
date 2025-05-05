/**
 * Componente principal que muestra una cuadrícula de planetas.
 * Permite filtrar, buscar y ordenar los planetas, así como marcarlos como favoritos.
 * @param {boolean} showOnlyFavorites - Si es true, solo muestra los planetas marcados como favoritos
 */
import React, { useCallback, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
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
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: newOrder === "asc" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar planeta..."
          style={styles.searchContainer}
        />
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons
              name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
              size={24}
              color="#6EC1E4"
            />
          </Animated.View>
          <Text style={styles.sortButtonText}>
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
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
    width: "100%",
  },
  searchContainer: {
    flex: 1,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 8,
    gap: 5,
    minWidth: 80,
  },
  sortButtonText: {
    color: "#6EC1E4",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    gap: 10,
  },
});
