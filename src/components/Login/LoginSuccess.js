import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Footer from "../Footer/Footer"; // Asegúrate de importar correctamente el componente Footer
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function LoginSuccess({ route }) {
  const { dataPropiedades } = route.params;
  const navigation = useNavigation();

  const [saldoColones, setSaldoColones] = useState(1500000);
  const [saldoDolares, setSaldoDolares] = useState(2000);
  const [cuotaColones, setCuotaColones] = useState(50000);
  const [cuotaDolares, setCuotaDolares] = useState(100);
  const [propiedades, setPropiedades] = useState([]);

  const handleCardPressProjection = async (
    idQuote = 14338,
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

  const handleCardPressBalance = (nombre, proyecto) => {
    navigation.navigate("BalanceReport", { nombre, proyecto, dataPropiedades });
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cardPropiedades}>
            <View style={styles.cardHeaderPropiedades}>
              <Text style={styles.cardTitlePropiedades}>Mis Movimientos</Text>
            </View>
            <View style={styles.cardBodyPropiedades}>
              {dataPropiedades.map((propiedad) => (
                <TouchableOpacity
                  key={propiedad.id_propierty}
                  style={styles.propertyContainer}
                  onPress={() =>
                    handleCardPressBalance(
                      propiedad.nombre_propiedad,
                      propiedad.nombre_proyecto
                    )
                  }
                >
                  <Text style={styles.propertyText}>
                    {propiedad.nombre_propiedad} - {propiedad.nombre_proyecto}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* !!!!!!!!!!EStA ES LA CARTA PARA LAS PROYECCIONES */}
          <View style={styles.cardPropiedades}>
            <View style={styles.cardHeaderPropiedades}>
              <Text style={styles.cardTitlePropiedades}>Mis Proyecciones</Text>
            </View>
            <View style={styles.cardBodyPropiedades}>
              {dataPropiedades.map((propiedad) => (
                <TouchableOpacity
                  key={propiedad.id_propierty}
                  style={styles.propertyContainer}
                  onPress={() =>
                    handleCardPressProjection(
                      propiedad.id_quote, // Agrega el id_quote aquí
                      propiedad.quote_type, // Agrega el quote_type aquí
                      propiedad.proyeccion_real // Agrega la proyeccion_real aquí
                    )
                  }
                >
                  <View style={styles.iconTextContainer}>
                    <Text style={styles.propertyText}>
                      {propiedad.nombre_propiedad} - {propiedad.nombre_proyecto}
                    </Text>
                    <Image
                      source={require("../../../assets/pdf.png")}
                      style={styles.icono}
                    />
                      <Text style={styles.downloadLink}>Descargar</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.cardPropiedades}>
            <View style={styles.cardHeaderPropiedades}>
              <Text style={styles.cardTitlePropiedades}>Mis saldos</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Saldo en colones</Text>
                <Text
                  style={[
                    styles.saldoText,
                    { fontSize: 24, fontWeight: "bold" },
                  ]}
                >
                  ₡{saldoColones}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Saldo en dólares</Text>
                <Text
                  style={[
                    styles.saldoText,
                    { fontSize: 24, fontWeight: "bold" },
                  ]}
                >
                  ${cuotaDolares}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardPropiedades}>
            <View style={styles.cardHeaderPropiedades}>
              <Text style={styles.cardTitlePropiedades}>Próximas Cuotas</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Saldo en colones</Text>
                <Text
                  style={[
                    styles.saldoText,
                    { fontSize: 24, fontWeight: "bold" },
                  ]}
                >
                  ₡{cuotaColones}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Saldo en dólares</Text>
                <Text
                  style={[
                    styles.saldoText,
                    { fontSize: 24, fontWeight: "bold" },
                  ]}
                >
                  ${cuotaDolares}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#b6dfa0",
  },
  card: {
    marginTop: 40,
    backgroundColor: "#f4df84",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
  },
  cardHeader: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e2e3d9",
    padding: 30,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  columnTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  saldoText: {
    fontSize: 16,
    color: "#003366",
  },
  iconTextContainer: {
    flexDirection: "row", // Mostrar el icono y el texto en una fila
    alignItems: "center", // Alinear verticalmente al centro
  },
  icono: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginLeft: 15,
    resizeMode: "contain",
  },
  propertyText: {
    fontSize: 16,
    color: "#003366",
  },
  cardPropiedades: {
    backgroundColor: "white", // Color de fondo gris casi blanco
    padding: 0,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Sombra en Android
  },
  cardHeaderPropiedades: {
    backgroundColor: "#049444", // Color verde
    padding: 10,
    borderRadius: 5,
  },
  cardTitlePropiedades: {
    color: "white", // Color de texto blanco
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardBodyPropiedades: {
    padding: 16,
    backgroundColor: "#e2e3d9",
  },
  propertyContainer: {
    // Estilos para tus elementos de propiedad dentro de la tarjeta
  },
  propertyText: {
    color: "black", // Color de texto negro
    fontSize: 15,
    fontWeight: "bold", // Texto en negrita
    marginBottom: 5, // Espacio entre elementos
    textTransform: "uppercase", // Convierte el texto en mayúsculas
  },
  downloadLink: {
    // Estilos para el enlace de descarga
    color: "blue", // Color del enlace
    textDecorationLine: "underline",
    fontSize: 12, // Subrayado para que parezca un enlace
    marginBottom: 5,
  },
  icono: {
    // Estilos para el icono
    marginLeft: 15,
    width: 24,
    height: 24,
  },
  // Otros estilos según sea necesario
});
