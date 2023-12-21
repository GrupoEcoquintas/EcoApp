import React, { useState } from "react";
import { useUserId } from "../navigation/Context";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import md5 from "crypto-js/md5";
import { useNavigation } from "@react-navigation/native";

function ChangePassword({ route }) {
  const navigation = useNavigation();
  const { userId } = useUserId();
  console.log("userId en ChangePassword:", userId);

  const [contrasenaAnterior, setContrasenaAnterior] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const convertirMD5 = (texto) => {
    return md5(texto).toString();
  };
  const handleChangePassword = () => {
    // Realiza la solicitud de cambio de contraseña aquí
    const data = {
      contrasenaanterior: convertirMD5(contrasenaAnterior),
      nuevacontrasena: nuevaContrasena,
      idUsuario: userId,
    };
    fetch("https://api-rest.ecoquintas.net/api/cambiarContrasena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Contraseña cambiada exitosamente ✔️") {
          // La contraseña se cambió correctamente
          Alert.alert("Contraseña cambiada exitosamente");
          navigation.navigate("LoginScreen");
        } else {
          // Se produjo un error al cambiar la contraseña, muestra el mensaje de error
          Alert.alert("Error al cambiar la contraseña");
        }
      })
      .catch((error) => {
        console.error("Error al cambiar la contraseña:", error);
      });
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={styles.background}
    >
      <View>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
        <Text style={styles.text}>En donde nace la Felicidad.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contraseña Actual"
            onChangeText={(text) => setContrasenaAnterior(text)}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nueva Contraseña"
            onChangeText={(text) => setNuevaContrasena(text)}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.loginButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    color: "white",
    marginTop: "-3%",
    marginLeft: "28%",
    marginBottom: 50,
    fontSize: 17,
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft: 60,
    marginBottom: 10,
    marginTop: 10,
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

export default ChangePassword;
