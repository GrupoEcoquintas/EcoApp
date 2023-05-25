import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

// Importa tus componentes de pantalla
import LoginScreen from "../Login/LoginScreen";
import LoginSuccess from "../Login/LoginSuccess";
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
          title: "GrupoEcoquintas",
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
