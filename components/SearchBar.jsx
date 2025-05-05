/**
 * Componente de barra de búsqueda personalizada.
 * Proporciona una interfaz de búsqueda con un ícono y un campo de texto.
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del campo de búsqueda
 * @param {function} props.onChangeText - Función llamada cuando el texto cambia
 * @param {string} [props.placeholder="Buscar..."] - Texto placeholder del campo de búsqueda
 */
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText, placeholder = "Buscar..." }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#6EC1E4" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
     width: "70%",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    padding: 0,
  },
});

export default SearchBar;
