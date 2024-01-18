import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useUserId } from "../navigation/Context";

export default function ProjectionScreen({ route }) {
  const { userId, dataPropiedades } = useUserId();
  const navigation = useNavigation();
  const handleCardPressProjection = async (
    idQuote = 0,
    quoteType = 0,
    proyeccionReal = 1
  ) => {
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

      // Obtén la respuesta de la API
      const responseData = await response.json();

      // Verifica que se haya generado correctamente
      if (
        responseData.message !==
        "Proyección generada y URL pre-firmado generado ✔️"
      ) {
        throw new Error("No se pudo generar la proyección correctamente.");
      }

      // Obtiene la URL del archivo generado en S3
      const fileUrl = responseData.s3Location;

      // Define el nombre del archivo de descarga
      const fileName = `Proyeccion_${idQuote}.pdf`;

      // Define la ubicación local donde se guardará el archivo
      const localUri = FileSystem.documentDirectory + fileName;

      // Descarga el archivo desde el enlace de S3
      const downloadResult = await FileSystem.downloadAsync(fileUrl, localUri);

      if (downloadResult.status === 200) {
        // console.log('Archivo descargado en:', downloadResult.uri);

        // Abre el archivo PDF en un visor
        Sharing.shareAsync(downloadResult.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Abrir PDF",
        });
      } else {
        //console.error('Error al descargar el archivo. Estado:', downloadResult.status);
        Alert.alert("Error", "No se pudo descargar el archivo.");
      }
    } catch (error) {
      //console.error('Error:', error);
      Alert.alert("Error", "Ocurrió un error inesperado.");
    }
  };

  useEffect(() => {
    // Implementa cualquier lógica adicional necesaria al cargar el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Proyecciones</Text>
      <ScrollView>
        {dataPropiedades.map((propiedad) => (
          <TouchableOpacity
            key={propiedad.id_propierty}
            style={styles.cardPropiedad}
            onPress={() =>
              handleCardPressProjection(
                propiedad.id_cotizacion,
                propiedad.quote_type,
                propiedad.proyeccion_real
              )
            }
          >
            <Text style={styles.cardTitle}>{propiedad.nombre_propiedad}</Text>
            <Text style={styles.propertyText}>{propiedad.nombre_proyecto}</Text>
          </TouchableOpacity>
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
  