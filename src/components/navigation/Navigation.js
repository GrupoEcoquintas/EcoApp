import * as React from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import Logo from "../../../assets/logo.png"; // Asegúrate de que la ruta sea correcta

// Importa tus componentes de pantalla
import Menu from "../Main/Menu";
import LoginScreen from "../Login/LoginScreen";
import LoginSuccess from "../Login/LoginSuccess";
import BalanceReport from "../Balance/BalanceReport";
import ProjectionReport from "../Projection/ProjectionReport";
import Profile from "../Profile/Profile";
import ResetPassword from "../Login/ResetPassword";
import ChangePassword from "../Login/ChangePassword";

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
          name="Menu"
          component={Menu}
          options={({ navigation }) => ({
            // Añade la función aquí para obtener 'navigation'
            headerStyle: {
              backgroundColor: "#049444AA",
              height: 200,
              borderBottomWidth: 2,
              borderBottomColor: "#ffffff",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerTransparent: true,
            headerLeft: () => null,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem("token");
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "LoginScreen" }],
                      })
                    );
                  } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                  }
                }}
              >
                <Ionicons name="exit" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
                style={{ width: 150, height: "100%" }}
              />
            ),
          })}
        />

        <Stack.Screen
          name="LoginSuccess"
          component={LoginSuccess}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerLeft: () => null, // Esto oculta el botón de retroceso
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem("token");
                    // Restablece el estado de navegación para evitar regresar a la pantalla anterior
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "LoginScreen" }],
                      })
                    );
                  } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                  }
                }}
              >
                <Ionicons name="exit" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerTintColor: "white",
            title: "GrupoEcoquintas",
            headerTitleAlign: "center",
            gestureEnabled: false,
          })}
        />

        <Stack.Screen
          name="BalanceReport"
          component={BalanceReport}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerTintColor: "white",
            title: "Estado de Cuenta",
            headerTitleAlign: "center", // Centra el título en el encabezado
            headerBackTitle: "Atrás",
            // Pasa dataPropiedades como parámetro al componente BalanceReport
            passProps: { dataPropiedades: route.params.dataPropiedades },
          })}
        />

        <Stack.Screen
          name="ProjectionReport"
          component={ProjectionReport}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerTintColor: "white",
            title: "Reporte de Proyecciones",
            headerTitleAlign: "center", // Centra el título en el encabezado
            // Pasa dataPropiedades como parámetro al componente BalanceReport
            passProps: { dataPropiedades: route.params.dataPropiedades },
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 150, // Ajusta la altura según tus necesidades
            },
            headerTintColor: "white",
            title: "Perfil",
            headerTitleAlign: "center", // Centra el título en el encabezado
            headerBackTitle: "Atrás",
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
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
