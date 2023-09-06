import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../Footer/Footer";

const ProjectionReport = ({ route }) => {
  const [movimientos, setMovimientos] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fecha, setFecha] = useState([]);
  const [concepto, setConcepto] = useState([]);
  const [monto, setMonto] = useState([]);
  const [saldoActual, setSaldoActual] = useState([]);
  const { nombre, proyecto, dataPropiedades } = route.params;

  // Filtrar los datos de dataPropiedades
  const propiedadFiltrada = dataPropiedades.find(
    (propiedad) =>
      propiedad.nombre_propiedad === nombre &&
      propiedad.nombre_proyecto === proyecto
  );
  console.log("Esta es la propiedad Filtrada desde Porjections", propiedadFiltrada);
  const idCotizacion = propiedadFiltrada
    ? propiedadFiltrada.id_cotizacion
    : null;
  console.log(
    "Este es el id filtrado con los parametros recibidos ",
    idCotizacion
  );
  const userName = propiedadFiltrada.userName;
  console.log("Este es el userName desde Reporte de cuenta", userName);

  useEffect(() => {
    const url = "http://localhost:3000/api/repEstadoCuenta";
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
        console.log("Estos son los resultados del fetch", results);
        const movimientosActualizados = results.map((result) => ({
          fecha: result.fecha,
          concepto: result.nombre_tipo_pago,
          monto: result.total_pagado,
          saldo: result.nuevo_balance,
        }));
        setMovimientos([
          ...movimientosActualizados,
          {
            fecha: results.fecha,
            concepto: results.nombre_tipo_pago,
            monto: results.total_pagado,
            saldo: results.nuevo_balance,
          },
        ]);
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
    saldo: 1000,
    movimientos: movimientos.map((movimiento) => ({
      fecha: formatDate(movimiento.fecha),
      concepto: movimiento.concepto,
      monto: movimiento.monto,
      saldo: movimiento.saldo,
    })),
  };
  function formatDate(fechaISO8601) {
    if (!fechaISO8601) {
      return "N/A"; // Mostrar "N/A" si la fecha no está definida
    }
    const fecha = new Date(fechaISO8601);

    if (isNaN(fecha.getTime())) {
      return null; // Mostrar "Fecha Inválida" si la fecha no es válida
    }

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Proyecciones</Text>
      <Text style={styles.subHeading}>Cliente: {cliente.userName}</Text>
      <Text style={styles.subHeading}>
        Nombre del proyecto: {cliente.nombreProyecto}
      </Text>
      <Text style={styles.subHeading}>
        Número de Lote: {cliente.numeroLote}
      </Text>

      {dataLoaded && (
        <View style={styles.movimientosContainer}>
          <View style={styles.titulosContainer}>
            <Text style={[styles.titulo, styles.alignLeft]}>Tipo de Cotización</Text>
            <Text style={[styles.titulo, styles.alignLeft]}>Cliente</Text>
            <Text style={[styles.titulo, styles.alignLeft]}>Fecha Creación</Text>
          </View>

          {cliente.movimientos.map((movimiento, index) => (
            <View
              style={[
                styles.movimiento,
                index % 2 === 0 ? null : styles.filaImpar,
              ]}
              key={index}
            >
              {/* Solo muestra la fecha si es válida */}
              {movimiento.fecha !== "Fecha Inválida" && (
                <Text style={[styles.fecha, styles.alignLeft]}>
                  {formatDate(movimiento.fecha)}
                </Text>
              )}

              <Text style={[styles.concepto, styles.alignLeft]}>
                {movimiento.concepto}
              </Text>
              <Text style={[styles.monto, styles.alignRight]}>
                {movimiento.monto}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#6fbf73", // Color verde claro
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  titulosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
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
    marginBottom: 10,
  },
  filaImpar: {
    backgroundColor: "#f9f9f9", // Color gris claro para las filas impares
  },
  fecha: {
    flex: 2,
    fontSize: 16,
  },
  concepto: {
    marginLeft: 5,
    flex: 2,
    fontSize: 16,
  },
  monto: {
    marginRight: 5,
    flex: 1,
    fontSize: 16,
  },
  saldoAcual: {
    flex: 2,
    fontSize: 16,
  },
});

export default ProjectionReport;
