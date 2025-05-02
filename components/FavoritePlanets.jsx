import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemPlanet from "./ItemPlanet";

export default function FavoritePlanets({ images }) {
  const [favorites, setFavorites] = useState([]);
  //console.log(favorites);
  useEffect(() => {
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

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <ItemPlanet
            images={images}
            item={item}
            isFavorite={true}
            onToggleFavorite={() => {}}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    padding: 10,
  },
});
