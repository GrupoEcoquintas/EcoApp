import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import Footer from "../Footer/Footer";
import { useUserId } from "../navigation/Context";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    name: "Nombre de Usuario",
    email: "usuario@example.com",
    phone: "123-456-7890",
    profilePicture: require("../../../assets/user.png"),
  });
  const { userId, dataPropiedades, email } = useUserId();

  useEffect(() => {
    if (dataPropiedades && dataPropiedades.length > 0) {
      const userName = dataPropiedades[0].userName;
      setUser((prevState) => ({ ...prevState, name: userName, email: email }));
    }
  }, [dataPropiedades, email]);

  // Función para manejar el cambio de foto de perfil
  const handleChangeProfilePicture = () => {
    // Implementa la lógica para cambiar la foto de perfil aquí
  };

  // Función para manejar el cambio de contraseña
  const handleChangePassword = () => {
    if (userId) {
      navigation.navigate("ChangePassword", { userId });
    } else {
      console.error("El userId no está definido.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={handleChangeProfilePicture}>
          <Image source={user.profilePicture} style={styles.profilePicture} />
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <TouchableOpacity onPress={handleChangePassword}>
          <Text style={styles.link}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer navigation={navigation} userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#049444",
  },
  scrollView: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    marginTop: -4,
    overflow: 'hidden',
    borderTopWidth: 5,
    borderTopColor: '#049444',
    // Añade sombras para crear el efecto de elevación
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2, // Ajusta la dirección de la sombra
    },
    shadowOpacity: 0.3, // Ajusta la opacidad de la sombra
    shadowRadius: 5,
    elevation: 5, // Elevación en Android
  },
  profilePicture: {
    alignSelf: "center",
    marginTop: 60,
    width: 150,
    height: 150,
    borderRadius: 75, // Para hacerlo circular, la mitad del tamaño
    marginBottom: 20,
  },
  name: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    alignSelf: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
});
