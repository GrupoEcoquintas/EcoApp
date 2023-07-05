import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from "../Footer/Footer";

const BalanceReport = () => {
  const cliente = {
    nombre: 'Kleyt Palmyr Eugene',
    nombreProyecto: 'Batsú',
    numeroLote: '005',
    saldo: 1000,
    movimientos: [
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      { fecha: '2023-05-01', concepto: 'Abono', monto: 2000, saldo: '6000000' },
      // Agrega más movimientos según tus necesidades
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Estado de Cuenta</Text>
      <Text style={styles.subHeading}>Cliente: {cliente.nombre}</Text>
      <Text style={styles.subHeading}>Nombre del proyecto: {cliente.nombreProyecto}</Text>
      <Text style={styles.subHeading}>Número de Lote: {cliente.numeroLote}</Text>
      <Text style={styles.saldo}>Saldo Actual: {cliente.saldo}</Text>

      <View style={styles.movimientosContainer}>
        <View style={styles.titulosContainer}>
          <Text style={[styles.titulo, styles.alignLeft]}>Fecha</Text>
          <Text style={[styles.titulo, styles.alignLeft]}>Tipo de Pago</Text>
          <Text style={[styles.titulo, styles.alignRight]}>Monto</Text>
          <Text style={[styles.titulo, styles.alignRight]}>Saldo Actual</Text>
        </View>

        {cliente.movimientos.map((movimiento, index) => (
          <View
            style={[styles.movimiento, index % 2 === 0 ? null : styles.filaImpar]}
            key={index}
          >
            <Text style={[styles.fecha, styles.alignLeft]}>{movimiento.fecha}</Text>
            <Text style={[styles.concepto, styles.alignLeft]}>{movimiento.concepto}</Text>
            <Text style={[styles.monto, styles.alignRight]}>{movimiento.monto}</Text>
            <Text style={[styles.saldoAcual, styles.alignRight]}>{movimiento.saldo}</Text>
          </View>
        ))}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6fbf73', // Color verde claro
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  saldo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  movimientosContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  titulosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  titulo: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
  movimiento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filaImpar: {
    backgroundColor: '#f9f9f9', // Color gris claro para las filas impares
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

export default BalanceReport;
