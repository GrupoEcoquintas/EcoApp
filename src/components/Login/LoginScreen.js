import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import { useNavigation } from "@react-navigation/native";
import { useUserId } from "../navigation/Context";

export default function LoginScreen() {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const hashPassword = (password) => {
    return CryptoJS.MD5(password).toString();
  };
  const navigation = useNavigation();
  // Función para manejar el reset de contraseña
  const handleChangePassword = () => {
    navigation.navigate("ResetPassword"); // Navega a la pantalla de restablecimiento de contraseña
  };
  // Desestructura el valor de setUserId desde useUserId
  const { setUserId, setDataPropiedades, email, setEmail } = useUserId();
  const loginPressed = () => {
    // Construir el objeto de datos a enviar
    const data = {
      email: email,
      password: hashedPassword,
    };

    // Enviar la solicitud al backend
    fetch("https://api-rest.ecoquintas.net/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Esta es la data recibida del fetch authenticate", data);
        // Manejar la respuesta del backend
        if (data.token) {
          // Autenticación exitosa, guardar el token en el dispositivo o en el estado de la aplicación
          // Establecer userId y dataPropiedades en el contexto
          setUserId(data.userId);
          setDataPropiedades(data.dataPropiedades);
          console.log(
            "Esta es la info seteada en DataPropiedades",
            data.dataPropiedades
          );
          AsyncStorage.setItem("token", data.token)
            .then(() => {
              //Mostrar alerta de inicio de sesión exitoso
              Alert.alert(
                "Inicio de sesión exitoso",
                "¡Has iniciado sesión correctamente!"
              );
              // Navegar a la siguiente pantalla y pasar la variable dataPropiedades como parámetro
              console.log(data.dataPropiedades[0].userName);
              navigation.navigate("Menu", {
                dataPropiedades: data.dataPropiedades,
                userId: data.userId,
                userName: data.dataPropiedades[0].userName,
              });
            })
            .catch((error) => {
              console.log("Error al guardar el token:", error);
            });
        } else {
          // Autenticación fallida, mostrar mensaje de error
          Alert.alert("Error de autenticación", "Credenciales inválidas");
        }
      })
      .catch((error) => {
        console.log("Error en la solicitud:", error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={styles.background}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>En donde nace la Felicidad.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Correo electrónico"
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(password) => {
              setPassword(password);
              const hashed = hashPassword(password);
              setHashedPassword(hashed);
            }}
          />
        </View>

        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={handleChangePassword}>
            <Text style={styles.forgot_button}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={loginPressed}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 180,
    height: 180,
    marginLeft: "28%",
    marginTop: "15%",
  },
  text: {
    color: "#049444",
    marginTop: "-3%",
    marginLeft: "28%",
    marginBottom: 50,
    fontSize: 19,
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft: 60,
    marginBottom: 10,
  },
  TextInput: {
    flex: 1,
    height: 40,
    padding: 10,
    textAlign: "center",
  },
  forgotContainer: {
    alignSelf: "center",
    marginTop: 15,
  },
  forgot_button: {
    alignSelf: "center",
    height: 20,
    marginTop: 5,
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 18,
  },
  loginButton: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: "#168039",
    borderColor: "#168039",
  },
  loginButtonText: {
    color: "white",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 10,
  },
});
