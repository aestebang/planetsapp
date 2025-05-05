import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../hooks/useFavorites";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Page() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const mass = params.mass ? JSON.parse(params.mass) : null;
  const aroundPlanet = params.aroundPlanet
    ? JSON.parse(params.aroundPlanet)
    : null;
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["rgba(30, 30, 30, 0.9)", "rgba(30, 30, 30, 0.7)"]}
        style={styles.gradientContainer}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="#6EC1E4" />
        </Pressable>

        <View style={styles.imageContainer}>
          <Image
            source={
              params.image
                ? { uri: params.image }
                : {
                    uri: `https://via.placeholder.com/300x300/000000/6EC1E4?text=${params.name}`,
                  }
            }
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(params.id)}
          >
            <Ionicons
              name={isFavorite(params.id) ? "star" : "star-outline"}
              size={32}
              color="#6EC1E4"
            />
          </Pressable>
        </View>

        <Text style={styles.title}>{params.name}</Text>
        <Text style={styles.subtitle}>{params.type}</Text>

        <View style={styles.infoSection}>
          <InfoItem
            label="Temperatura promedio"
            value={`${Math.round(params.temp - 273.15)}°C`}
          />
          <InfoItem
            label="Gravedad"
            value={`${Number(params.gravity).toFixed(1)} m/s²`}
          />
          <InfoItem
            label="Masa"
            value={`${mass?.massValue?.toExponential(2) || "N/A"} ${
              mass?.massExponent ? `× 10^${mass.massExponent}` : ""
            } kg`}
          />
          <InfoItem
            label="Densidad"
            value={`${Number(params.density)?.toFixed(2) || "N/A"} g/cm³`}
          />
          <InfoItem
            label="Radio ecuatorial"
            value={`${(Number(params.radius) / 1000).toFixed(0)} km`}
          />
          {params.orbit && (
            <InfoItem
              label="Período orbital"
              value={`${Number(params.orbit).toFixed(2)} días`}
            />
          )}
        </View>

        {aroundPlanet && (
          <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>Órbita alrededor de:</Text>
            <Text style={styles.sectionText}>{aroundPlanet.planet}</Text>
          </View>
        )}

        {params.discoveredBy && (
          <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>Descubierto por:</Text>
            <Text style={styles.sectionText}>{params.discoveredBy}</Text>
            <Text style={styles.sectionText}>{params.discoveryDate}</Text>
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradientContainer: {
    padding: 20,
    minHeight: "100%",
  },
  imageContainer: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
    position: "relative",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6EC1E4",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(110, 193, 228, 0.2)",
  },
  infoLabel: {
    fontSize: 16,
    color: "#6EC1E4",
  },
  infoValue: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  additionalInfo: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#6EC1E4",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
