import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => console.log("Button 1 pressed")}>
          <Ionicons name="ios-home" size={28} color="#333" />
          <Text style={styles.footerButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => console.log("Button 2 pressed")}>
          <Ionicons name="ios-search" size={28} color="#333" />
          <Text style={styles.footerButtonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => console.log("Button 3 pressed")}>
          <Ionicons name="ios-person" size={28} color="#333" />
          <Text style={styles.footerButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: '#fefae0'
  },
  footerButton: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  footerButtonText: {
    marginTop: 5,
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Footer;
