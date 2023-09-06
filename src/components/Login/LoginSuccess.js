import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Footer from "../Footer/Footer"; // Asegúrate de importar correctamente el componente Footer
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginSuccess({ route }) {
  const { dataPropiedades } = route.params;
  const navigation = useNavigation();

  const [saldoColones, setSaldoColones] = useState(1500000);
  const [saldoDolares, setSaldoDolares] = useState(2000);
  const [cuotaColones, setCuotaColones] = useState(50000);
  const [cuotaDolares, setCuotaDolares] = useState(100);
  const [propiedades, setPropiedades] = useState([]);

  const handleCardPressBalance = (nombre, proyecto) => {
    navigation.navigate("BalanceReport", { nombre, proyecto, dataPropiedades });
  };
  const handleCardPressProjection = (id_quote, quote_type, proyeccion_real) => {
    fetch("/generaProyeccion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_id_quote: id_quote,
        p_quote_type: quote_type,
        p_proyeccion_real: proyeccion_real,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob(); // Convierte la respuesta a un blob (archivo)
      })
      .then((blob) => {
        // Crea un objeto URL para el blob
        const url = URL.createObjectURL(blob);

        // Crea un enlace invisible en el DOM para descargar el PDF
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Proyeccion.pdf"; // Nombre del archivo PDF
        document.body.appendChild(a);

        // Dispara un clic en el enlace para iniciar la descarga
        a.click();

        // Limpia el objeto URL y remueve el enlace del DOM
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error al generar el PDF:", error);
        // Puedes mostrar un mensaje de error al usuario si es necesario
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cardPropiedades}>
            <View style={styles.cardHeaderPropiedades}>
              <Text style={styles.cardTitlePropiedades}>Mis Propiedades</Text>
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
            <View style={styles.cardBodyProjections}>
              {dataPropiedades.map((propiedad) => (
                <TouchableOpacity
                  key={propiedad.id_propierty}
                  style={styles.propertyContainer}
                  onPress={() =>
                    handleCardPressProjection(
                      propiedad.nombre_propiedad,
                      propiedad.nombre_proyecto,
                      propiedad.id_quote, // Agrega los valores necesarios aquí
                      propiedad.quote_type, // Agrega los valores necesarios aquí
                      propiedad.proyeccion_real // Agrega los valores necesarios aquí
                    )
                  }
                >
                  <View style={styles.iconTextContainer}>
                    <Text style={styles.propertyText}>
                      {propiedad.nombre_propiedad} - {propiedad.nombre_proyecto}
                    </Text>
                    <Image
                      source={require("../../../assets/descargarIcon.png")}
                      style={styles.icono}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Mis saldos</Text>
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

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Próximas Cuotas</Text>
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

          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Movimientos</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Pago App</Text>
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
              <View style={styles.cardBody}>
                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Pago App</Text>
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
              <View style={styles.cardBody}>
                <View style={styles.column}>
                  <Text style={styles.columnTitle}>Pago App</Text>
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
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
  card: {
    marginTop: 40,
    backgroundColor: "#eaeaec",
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
  cardPropiedades: {
    marginTop: 40,
    backgroundColor: "#eaeaec",
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
  cardTitlePropiedades: {
    fontSize: 30,
    marginBottom: 10,
    color: "green",
  },
  cardHeader: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "orange",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  cardBodyPropiedades: {
    flexDirection: "column", // Cambiar a "column" para apilar verticalmente
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
});
