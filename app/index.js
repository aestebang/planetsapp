import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import CardPlanet from "../components/CardPlanet";
import { SafeAreaView } from "react-native-safe-area-context";
import App from "../App";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <App />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
