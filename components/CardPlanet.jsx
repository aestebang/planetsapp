import React, { useState } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import useGetAllPlanet from "../hooks/useGetAllPlanet";
import usePlanetImages from "../hooks/usePlanetImages";
import { useFavorites } from "../hooks/useFavorites";
import { filterPlanets } from "../utils/planetFilters";
import ItemPlanet from "./ItemPlanet";
import AnimationLottie from "./AnimationLottie";
import SearchBar from "./SearchBar";
import cohete from "../assets/animations/Animation-cohete.json";

const CARD_WIDTH = Dimensions.get("window").width / 2 - 20;

export default function CardPlanet({ showOnlyFavorites = false }) {
  const { planets } = useGetAllPlanet();
  const images = usePlanetImages(planets?.bodies || []);
  const [searchText, setSearchText] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (!planets || !planets.bodies) {
    return <AnimationLottie animationData={cohete} />;
  }

  const filteredPlanets = filterPlanets(
    planets.bodies,
    searchText,
    showOnlyFavorites,
    isFavorite
  );

  return (
    <View style={styles.mainContainer}>
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={filteredPlanets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemPlanet 
            images={images} 
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
  },
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
  },
  loadingImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: CARD_WIDTH,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6EC1E4",
  },
  subtitle: {
    fontSize: 12,
    color: "#CCCCCC",
    marginBottom: 4,
  },
});
