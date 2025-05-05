import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Componente que muestra los detalles detallados de un planeta.
 * Incluye información como temperatura, gravedad, densidad, radio y más.
 * @param {Object} planetData - Datos del planeta a mostrar
 */
const PlanetDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Planet</Text>
      <LinearGradient
        colors={["rgba(30, 30, 30, 0.9)", "rgba(30, 30, 30, 0.7)"]}
        style={styles.gradientContainer}
      >
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : {
                  uri: `https://via.placeholder.com/500x300/000000/6EC1E4?text=${planetData.englishName}`,
                }
          }
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{planetData.englishName}</Text>
        <Text style={styles.subtitle}>{planetData.bodyType}</Text>

        <View style={styles.infoSection}>
          <InfoItem
            title="Temperatura Media"
            value={`${Math.round(planetData.avgTemp - 273.15)}°C`}
            icon="🌡️"
          />
          <InfoItem
            title="Gravedad"
            value={`${planetData.gravity.toFixed(1)} m/s²`}
            icon="🛸"
          />
          <InfoItem
            title="Densidad"
            value={`${planetData.density.toFixed(2)} g/cm³`}
            icon="⚖️"
          />
          <InfoItem
            title="Radio"
            value={`${planetData.meanRadius.toLocaleString()} km`}
            icon="📏"
          />
          {planetData.mass && (
            <InfoItem
              title="Masa"
              value={`${planetData.mass.massValue.toExponential(2)}×10^${
                planetData.mass.massExponent
              } kg`}
              icon="🌍"
            />
          )}
          {planetData.sideralOrbit && (
            <InfoItem
              title="Órbita Sideral"
              value={`${planetData.sideralOrbit.toFixed(2)} días`}
              icon="🔄"
            />
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

/**
 * Componente que renderiza un elemento de información individual
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título del elemento de información
 * @param {string} props.value - Valor a mostrar
 * @param {string} props.icon - Emoji o ícono a mostrar junto al elemento
 */
const InfoItem = ({ title, value, icon }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradientContainer: {
    padding: 20,
    minHeight: Dimensions.get("window").height,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    padding: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(110, 193, 228, 0.1)",
    paddingBottom: 10,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  infoTitle: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: "#6EC1E4",
    fontWeight: "500",
  },
});

export default PlanetDetails;
