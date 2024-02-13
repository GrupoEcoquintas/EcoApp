import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Footer from "../Footer/Footer";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const BalanceReport = ({ route }) => {
  const [movimientos, setMovimientos] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [saldoActual, setSaldoActual] = useState("...cargando");
  const [saldoCliente, setSaldoCliente] = useState(null);
  const { nombre, proyecto, dataPropiedades } = route.params;
  const navigation = useNavigation();

  // Filtrar los datos de dataPropiedades
  const propiedadFiltrada = dataPropiedades.find(
    (propiedad) =>
      propiedad.nombre_propiedad === nombre &&
      propiedad.nombre_proyecto === proyecto
  );
  //console.log("Esta es la propiedad Filtrada", propiedadFiltrada);
  const idCotizacion = propiedadFiltrada
    ? propiedadFiltrada.id_cotizacion
    : null;
  //console.log("Este es el id filtrado con los parametros recibidos ",idCotizacion);
  const userName = propiedadFiltrada.userName;
  //console.log("Este es el userName desde Reporte de cuenta", userName);

  function formatCurrency(monto, moneda) {
    const formatter = new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: moneda,
      minimumFractionDigits: 2,
    });

    return formatter.format(monto);
  }
  useEffect(() => {
    const url = "https://api-rest.ecoquintas.net/api/repEstadoCuenta";
    const requestBody = {
      id_cliente: propiedadFiltrada.id_cliente,
      id_propierty: propiedadFiltrada.id_propierty,
      id_project: propiedadFiltrada.id_project,
      cancelada: 0,
      id_cotizacion: idCotizacion,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        const saldo = data.results[0].saldo;
        setSaldoActual(saldo)
        console.log("Este es el slado", saldo);
        const movimientosActualizados = results.map((result) => {
          return {
            fecha: result.fecha,
            concepto: result.nombre_tipo_pago,
            monto: formatCurrency(result.total_pagado, result.moneda),
            saldo: formatCurrency(result.nuevo_balance, result.moneda),
            moneda: result.moneda,
          };
        });
        setMovimientos([...movimientosActualizados]);
        setDataLoaded(true);
        //setMovimientos(id_pago);
      })
      .catch((error) => {
        console.error("Error al obtener los movimientos:", error);
      });
  }, []);

  const cliente = {
    userName,
    nombreProyecto: proyecto,
    numeroLote: nombre,
    saldo: saldoActual,
    movimientos: movimientos
      .map((movimiento) => ({
        fecha: movimiento.fecha,
        concepto: movimiento.concepto,
        monto: movimiento.monto,
        saldo: movimiento.saldo,
        //moneda: movimiento.moneda,
        //simboloMoneda: getMonedaSymbol(movimiento.moneda),
      }))
      .filter((movimiento) => movimiento.fecha !== "Fecha Inválida"),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Cliente: {cliente.userName}</Text>
      <Text style={styles.subHeading}>Nombre del proyecto: {cliente.nombreProyecto}</Text>
      <Text style={styles.subHeading}>Número de Lote: {cliente.numeroLote}</Text>
      <Text style={styles.subHeading}>Saldo Actual: {saldoActual}</Text>
  
      <View style={styles.titulosContainer}>
        <Text style={[styles.titulo, styles.alignLeft]}>Fecha</Text>
        <Text style={[styles.titulo, styles.alignLeft]}>Tipo de Pago</Text>
        <Text style={[styles.titulo]}>Monto</Text>
        <Text style={[styles.titulo]}>Saldo Actual</Text>
      </View>
  
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.movimientosContainer}>
          {cliente.movimientos.map((movimiento, index) => (
            <View
              style={[
                styles.movimiento,
                index % 2 === 0 ? null : styles.filaImpar,
              ]}
              key={index}
            >
              <Text style={[styles.fecha, styles.alignLeft]}>
                {format(new Date(movimiento.fecha), "dd/MM/yyyy")}
              </Text>
              <Text style={[styles.concepto, styles.alignLeft]}>
                {movimiento.concepto}
              </Text>
              <Text style={[styles.monto]}>
                {movimiento.monto}
              </Text>
              <Text style={[styles.saldoAcual]}>
                {movimiento.saldo}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
  
      <Footer navigation={navigation} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    flex: 1,
    backgroundColor: "#ececdd",
    padding: 15,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  saldo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  movimientosContainer: {
    marginTop: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 3,
  },
  titulosContainer: {
    marginTop: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#ccc",
    padding: 5,
  },
  titulo: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  alignRight: {
    textAlign: "right",
  },
  alignLeft: {
    textAlign: "left",
  },
  movimiento: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filaImpar: {
    backgroundColor: "#f9f9f9", // Color gris claro para las filas impares
  },
  fecha: {
    flex: 1.9,
    fontSize: 13,
  },
  concepto: {
    marginLeft: 5,
    flex: 1.9,
    fontSize: 15,
  },
  monto: {
    marginRight: 1,
    flex: 2.5,
    fontSize: 15,
  },
  saldoAcual: {
    flex: 2.7,
    fontSize: 15,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
});

export default BalanceReport;
