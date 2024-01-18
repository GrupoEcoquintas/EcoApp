import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Footer from "../Footer/Footer";


const MainMenu = ({ navigation }) => {
  return (
    <ImageBackground
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
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
        <Footer navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const menuItems = [
    { title: "Movimientos", screen: "BalanceScreen" },
    { title: "Proyecciones", screen: "ProjectionScreen" },
    { title: "Tarjeta EQ", screen: "Menu" },
    { title: "Pago Electrónico (Proximamente)", screen: "Menu" },
  ];
  
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#049444",
    borderRadius: 5,
    alignSelf: 'center', // Centra la carta en el contenedor
    width: '80%', // Establece el ancho al 80% del ancho del contenedor
    alignItems: 'flex-start', // Alinea el texto a la izquierda
  },
  menuItemText: {
    color: "white",
    fontSize: 18,
    textAlign: 'left', // Alinea el texto a la izquierda
  },
});

export default MainMenu;
