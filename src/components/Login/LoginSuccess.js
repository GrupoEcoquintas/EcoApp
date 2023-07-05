import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Footer from "../Footer/Footer"; // Asegúrate de importar correctamente el componente Footer
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginSuccess() {
  const navigation = useNavigation();

  const [saldoColones, setSaldoColones] = useState(1500000);
  const [saldoDolares, setSaldoDolares] = useState(2000);
  const [cuotaColones, setCuotaColones] = useState(50000);
  const [cuotaDolares, setCuotaDolares] = useState(100);
  const [propiedades, setPropiedades] = useState([]);

  const handleCardPress = () => {
    navigation.navigate("BalanceReport");

    AsyncStorage.getItem("token")
      .then((token) => {
        fetch("http://localhost:3000/api/authenticate", {
          method: "POST", // Cambiado a POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agregado el token de autorización
          },
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(token);
            // Aquí puedes actualizar el estado con los datos obtenidos, por ejemplo:
            setPropiedades(data.propiedades2);
            console.log(data.propiedades2)
          })
          .catch((error) => {
            console.log("Error en la solicitud:", error);
          });
      })
      .catch((error) => {
        console.log("Error al obtener el token:", error);
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
              <View style={styles.columnPropiedades}>
                <Text style={styles.columnTitlePropiedades}>
                  Numero de Propiedad
                </Text>
                <Text
                  style={[
                    styles.saldoTextPropiedades,
                    { fontSize: 24, fontWeight: "bold" },
                  ]}
                >
                  {propiedades}
                </Text>
              </View>
              <View style={styles.separatorPropiedades} />
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

          <TouchableOpacity onPress={handleCardPress}>
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
});
