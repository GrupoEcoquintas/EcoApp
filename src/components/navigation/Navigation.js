import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Importa tus componentes de pantalla
import LoginScreen from "../Login/LoginScreen";
import LoginSuccess from "../Login/LoginSuccess";
import BalanceReport from "../Balance/BalanceReport";
// Importa más pantallas si es necesario

// Crea una instancia de Stack Navigator
const Stack = createStackNavigator();

// Configura la pila de navegación
const Navigation = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="LoginSuccess"
          component={LoginSuccess}
          options={{
            headerStyle: {
              backgroundColor: "#226035",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerRight: () => (
              <Ionicons
                name="leaf"
                size={24}
                color="white"
                style={{ marginRight: 88, transform: [{ rotate: "-90deg" }] }}
              />
            ),
            headerTintColor: "white",
            title: "GrupoEcoquintas",
            headerTitleAlign: "center", // Centra el título en el encabezado
          }}
        />
        <Stack.Screen
          name="BalanceReport"
          component={BalanceReport}
          options={{
            headerStyle: {
              backgroundColor: "#226035",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerTintColor: "white",
            title: "Reporte de Estado de Cuenta",
            headerTitleAlign: "center", // Centra el título en el encabezado
          }}
        />
        {/* Agrega más pantallas y configuraciones de navegación aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerStyle: {
    backgroundColor: "#168039",
  },
});

export default Navigation;
