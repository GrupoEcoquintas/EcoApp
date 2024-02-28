import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUserId } from "../navigation/Context"; // Asegúrate de que la ruta al contexto sea correcta
import { useNavigation } from "@react-navigation/native";

const HeaderTitleComponent = () => {
  const { userName } = useUserId(); // Usa useContext para acceder al contexto
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <TouchableOpacity onPress={goToProfile} style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/user.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.userNameText}>
            {userName || "Usuario Anónimo"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Alineación horizontal de la imagen y el texto
    alignItems: "center",
    marginLeft: 20,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10, // Espacio entre la imagen y los textos
  },
  welcomeText: {
    color: "white",
    fontSize: 16,
  },
  userNameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HeaderTitleComponent;
