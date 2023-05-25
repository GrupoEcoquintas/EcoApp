import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../Footer/Footer"; // Asegúrate de importar correctamente el componente Footer

export default function LoginSuccess() {
  const [saldoColones, setSaldoColones] = useState(1500000);
  const [saldoDolares, setSaldoDolares] = useState(2000);
  const [cuotaColones, setCuotaColones] = useState(50000);
  const [cuotaDolares, setCuotaDolares] = useState(100);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Mis saldos</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Saldo en colones</Text>
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>₡{saldoColones}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Saldo en dólares</Text>
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>${cuotaDolares}</Text>
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
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>₡{cuotaColones}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Saldo en dólares</Text>
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>${cuotaDolares}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Movimientos</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Saldo en colones</Text>
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>₡{cuotaColones}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Saldo en dólares</Text>
            <Text style={[styles.saldoText, { fontSize: 24, fontWeight: 'bold' }]}>${cuotaDolares}</Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    marginTop: 10,
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
    backgroundColor: "orange"
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
    color: "#003366"
  },
});
