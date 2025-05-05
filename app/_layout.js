import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PlanetsProvider } from "../context/PlanetsContext";

export default function Layout() {
  return (
    <PlanetsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="detailPlanet"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </PlanetsProvider>
  );
}
