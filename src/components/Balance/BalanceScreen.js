import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Footer from "../Footer/Footer"; // Asegúrate de importar correctamente el componente Footer
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useUserId } from "../navigation/Context";

export default function BalanceScreen({ route }) {
  const { userId, dataPropiedades, setUserId } = useUserId();
  const navigation = useNavigation();

  const handleCardPressBalance = (nombre, proyecto) => {
    navigation.navigate("BalanceReport", { nombre, proyecto, dataPropiedades });
  };
  useEffect(() => {
    // Actualizar el userId en el contexto al cargar el componente
    setUserId(userId);
  }, [userId, setUserId]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Propiedades</Text>
      <ScrollView>
        {dataPropiedades.map((propiedad, i) => (
          <ImageBackground
            key={propiedad.id_propierty}
            source={require("../../../assets/cardBG.jpg")} // Asegúrate de cambiar la ruta si es necesario
            style={styles.cardPropiedad}
            imageStyle={{ borderRadius: 10 }} // Para redondear las esquinas de la imagen de fondo
          >
            <TouchableOpacity
              key={propiedad.id_propierty}
              onPress={() =>
                handleCardPressBalance(
                  propiedad.nombre_propiedad,
                  propiedad.nombre_proyecto
                )
              }
            >
              <Text style={styles.cardTitle}>{propiedad.nombre_propiedad}</Text>
              <Text style={styles.propertyText}>
                {propiedad.nombre_proyecto}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ececdd",
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20, // Agrega un margen vertical para separar el título de las tarjetas
  },
  cardPropiedad: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  propertyText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Eliminar estilos redundantes o no utilizados
});
