import * as React from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importa tus componentes de pantalla
import Menu from "../Main/Menu";
import LoginScreen from "../Login/LoginScreen";
import LoginSuccess from "../Login/LoginSuccess";
import BalanceScreen from "../Balance/BalanceScreen";
import BalanceReport from "../Balance/BalanceReport";
import ProjectionScreen from "../Projection/ProjectionScreen";
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
          options={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 200,
              borderBottomWidth: 2,
              borderBottomColor: "#ffffff",
            },
            headerTitle: () => null,
            headerTintColor: "white",
            headerLeft: () => {
              // Obtener userName de los parámetros de la ruta
              const userName = route.params?.userName ?? "Usuario Anónimo";
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                    }}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 27.5,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Bienvenido
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      {userName}
                    </Text>
                  </View>
                </View>
              );
            },
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
          name="BalanceScreen"
          component={BalanceScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 200,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10, marginBottom: 90 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerTintColor: "white",
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  marginLeft: 20,
                }}
              >
                Mis Movimientos
              </Text>
            ),
            headerTitleAlign: "left",
          })}
        />
        <Stack.Screen
          name="ProjectionScreen"
          component={ProjectionScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 200,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10, marginBottom: 90 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerTintColor: "white",
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                Mis Proyecciones
              </Text>
            ),
            headerTitleAlign: "left",
            //gestureEnabled: false,
          })}
        />
        <Stack.Screen
          name="BalanceReport"
          component={BalanceReport}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: "#049444",
              height: 200, // Ajusta la altura según tus necesidades
            },
            headerTintColor: "white",
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                Estado de Cuenta
              </Text>
            ),
            headerTitleAlign: "center", // Centra el título en el encabezado
            headerBackTitle: "Atrás",
            // Pasa dataPropiedades como parámetro al componente BalanceReport
            passProps: { dataPropiedades: route.params.dataPropiedades },
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: "#049444",
              height: 200,
              //shadowOpacity: 0, // Elimina sombra
              //shadowRadius: 0,
              shadowOffset: { width: 0, height: 0 },
              //borderBottomWidth: 0, // Elimina el borde inferior
              //borderBottomColor: "transparent", // O hazlo transparente
            },
            headerTintColor: "white",
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                Perfil
              </Text>
            ),
            headerTitleAlign: "center",
            headerBackTitle: "Atrás",
          }}
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
    backgroundColor: "#049444",
  },
  headerStyle: {
    backgroundColor: "#168039",
  },
});

export default Navigation;