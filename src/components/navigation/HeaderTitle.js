import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useUserId } from "../navigation/Context"; // Asegúrate de que la ruta al contexto sea correcta

const HeaderTitleComponent = () => {
  const { userName } = useUserId(); // Usa useContext para acceder al contexto

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
        style={styles.image}
      />
      {/* Envuelve los textos en una View adicional para alinearlos verticalmente */}
      <View>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Text style={styles.userNameText}>{userName || 'Usuario Anónimo'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alineación horizontal de la imagen y el texto
    alignItems: 'center',
    marginLeft: 20,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10, // Espacio entre la imagen y los textos
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  userNameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HeaderTitleComponent;
