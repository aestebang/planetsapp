import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import CardPlanet from "../../components/CardPlanet";
import { useFocusEffect } from "expo-router";
import { useFavorites } from "../../hooks/useFavorites";

export default function Page() {
  const { loadFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      <CardPlanet showOnlyFavorites={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
