import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CARD_WIDTH = Dimensions.get("window").width / 2 - 20;

const ItemPlanet = ({ item, images, isFavorite, onToggleFavorite }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/detailPlanet",
      params: {
        id: item.id,
        name: item.englishName,
        type: item.bodyType,
        temp: item.avgTemp,
        gravity: item.gravity,
        mass: item.mass ? JSON.stringify(item.mass) : null,
        density: item.density,
        radius: item.equaRadius,
        orbit: item.sideralOrbit,
        aroundPlanet: item.aroundPlanet
          ? JSON.stringify(item.aroundPlanet)
          : null,
        discoveredBy: item.discoveredBy,
        discoveryDate: item.discoveryDate,
        image: images[item.englishName],
      },
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable style={styles.cardContent} onPress={handlePress}>
        <LinearGradient
          colors={["rgba(30, 30, 30, 0.9)", "rgba(30, 30, 30, 0.7)"]}
          style={styles.card}
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                images[item.englishName]
                  ? { uri: images[item.englishName] }
                  : {
                      uri: `https://via.placeholder.com/300x300/000000/6EC1E4?text=${item.englishName}`,
                    }
              }
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>{item.englishName}</Text>
          <Text style={styles.subtitle}>{item.bodyType}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              🌡️ {Math.round(item.avgTemp - 273.15)}°C
            </Text>
            <Text style={styles.infoText}>
              🛸 {item.gravity.toFixed(1)} m/s²
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
      <Pressable style={styles.favoriteButton} onPress={onToggleFavorite}>
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={24}
          color="#6EC1E4"
        />
      </Pressable>
    </View>
  );
};

export default ItemPlanet;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#6EC1E4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    padding: 12,
    borderRadius: 15,
    height: 220,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6EC1E4",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(110, 193, 228, 0.2)",
  },
  infoText: {
    fontSize: 11,
    color: "#CCCCCC",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
});
