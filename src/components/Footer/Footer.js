import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerLine} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => console.log("Button 1 pressed")}
        >
          <Ionicons name="ios-home" size={28} color="white" />
          <Text style={styles.footerButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => console.log("Button 2 pressed")}
        >
          <Ionicons name="ios-search" size={28} color="white" />
          <Text style={styles.footerButtonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Profile")} // Navegar a la pantalla de perfil
        >
          <Ionicons name="ios-person" size={28} color="white" />
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
    backgroundColor: "#049444",
  },
  footerButton: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  footerButtonText: {
    marginTop: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerLine: {
    height: 4,
    backgroundColor: "#E2C80B",
  },
});

export default Footer;
