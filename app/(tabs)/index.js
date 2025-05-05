import React from "react";
import { View, StyleSheet } from "react-native";
import CardPlanet from "../../components/CardPlanet";

export default function Page() {
  return (
    <View style={styles.container}>
      <CardPlanet showOnlyFavorites={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
