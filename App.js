// import 'expo-router/entry';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CardPlanet from './components/CardPlanet';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritePlanets from './components/FavoritePlanets';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CardPlanet />
      {/* <FavoritePlanets/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
