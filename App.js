// import 'expo-router/entry';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CardPlanet from "./components/CardPlanet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <CardPlanet />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
