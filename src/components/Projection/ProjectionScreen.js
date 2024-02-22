import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useUserId } from "../navigation/Context";

export default function ProjectionScreen({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const { userId, dataPropiedades } = useUserId();
  const navigation = useNavigation();
  const handleCardPressProjection = async (
    idQuote = 0,
    quoteType = 0,
    proyeccionReal = 1
  ) => {
    setIsLoading(true);
    try {
      // Realiza la solicitud a tu API para generar la proyección
      const response = await fetch(
        "https://api-rest.ecoquintas.net/api/generaProyeccion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_id_quote: idQuote,
            p_quote_type: quoteType,
            p_proyeccion_real: proyeccionReal,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo generar la proyección.");
      }

      const responseData = await response.json();

      if (
        responseData.message !==
        "Proyección generada y URL pre-firmado generado ✔️"
      ) {
        throw new Error("No se pudo generar la proyección correctamente.");
      }

      const fileUrl = responseData.s3Location;
      const fileName = `Proyeccion_${idQuote}.pdf`;
      const localUri = FileSystem.documentDirectory + fileName;
      const downloadResult = await FileSystem.downloadAsync(fileUrl, localUri);

      if (downloadResult.status === 200) {
        await Sharing.shareAsync(downloadResult.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Abrir PDF",
        });
      } else {
        Alert.alert("Error", "No se pudo descargar el archivo.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false); // Asegura que el indicador de carga se oculte al finalizar
    }
  };

  useEffect(() => {
    // Implementa cualquier lógica adicional necesaria al cargar el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Proyecciones</Text>
      {isLoading ? (
        // Contenedor para el ActivityIndicator con el estilo correcto
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#049444" />
        </View>
      ) : (
        <ScrollView>
          {dataPropiedades.map((propiedad) => (
            <TouchableOpacity
              key={propiedad.id_propierty}
              onPress={() =>
                handleCardPressProjection(
                  propiedad.id_cotizacion,
                  propiedad.quote_type,
                  propiedad.proyeccion_real
                )
              }
            >
              <ImageBackground
                source={require("../../../assets/cardBG.jpg")} // Asegúrate de reemplazar <RUTA_A_TU_IMAGEN> con la ruta real de tu imagen.
                style={styles.cardPropiedad}
                imageStyle={{ borderRadius: 10 }} // Esto es para asegurar que la imagen de fondo también tenga bordes redondeados.
              >
                <Text style={styles.cardTitle}>
                  {propiedad.nombre_propiedad}
                </Text>
                <Text style={styles.propertyText}>
                  {propiedad.nombre_proyecto}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    marginBottom: 300,
  },
});
