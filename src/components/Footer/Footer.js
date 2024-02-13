import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserId } from  "../navigation/Context";

const Footer = ({ navigation }) => {
  const { userId } = useUserId(); // Obtiene userId del contexto
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerLine} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Menu")}
        >
          <Ionicons name="ios-home" size={28} color="white" />
          <Text style={styles.footerButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Profile", { userId: userId })}
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
    backgroundColor: "#008C45", // Verde principal de Ecoquintas
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
    backgroundColor: "#FFD100", // Amarillo secundario de Ecoquintas
  },
});


export default Footer;
