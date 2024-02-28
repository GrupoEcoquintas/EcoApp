import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import Footer from "../Footer/Footer";

// Importa los iconos
import balanceIcon from '../../../assets/balanceIcon.png';
import presentacion from '../../../assets/presentacion.png';
import tarjetaEQ from '../../../assets/tarjetaEQ.png';
import pago from '../../../assets/pago.png';


const MainMenu = ({ navigation }) => {
  return (
    <View
      source={require("../../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image source={item.icon} style={styles.icon} /> 
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const menuItems = [
    { title: "Movimientos", screen: "BalanceScreen" , icon: balanceIcon },
    { title: "Proyecciones", screen: "ProjectionScreen" , icon: presentacion},
    { title: "Tarjeta EQ", screen: "Menu", icon: tarjetaEQ},
    { title: "Pago Electrónico (Proximamente)", screen: "Menu", icon: pago},
  ];
  
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ececdd",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40, // Agrega un margen inferior según necesites
  },
  menuItem: {
    width: '40%', // Ancho de cada cuadrado
    height: '30%', // Altura de cada cuadrado
    margin: '4%',
    backgroundColor: "#049444",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  menuItemText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16, // Reducir el tamaño de la fuente si es necesario
    textAlign: 'center',
    margin: 5, // Agregar margen para asegurar que el texto no toque los bordes
  },
  
  icon: {
    width: 65,
    height: 70,
  },
  title: {
    color: "green",
    fontWeight: "bold", // Usa "bold" para un peso más grueso
    fontSize: 40,
    textAlign: 'left',
    marginTop: 60,
    marginLeft: 30,
  },  
});

export default MainMenu;
