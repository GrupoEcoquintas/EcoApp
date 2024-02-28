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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Realiza la solicitud de restablecimiento de contraseña aquí
    fetch("https://api-rest.ecoquintas.net/api/cambiarContrasena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Maneja la respuesta del servidor aquí
        if (data.message === "Contraseña cambiada exitosamente ✔️") {
          // La contraseña se restableció correctamente
          Alert.alert("Contraseña restablecida exitosamente");
          navigation.navigate("LoginScreen");
        } else {
          // Se produjo un error, muestra el mensaje de error
          Alert.alert(data.message || "Error al restablecer la contraseña");
        }
      })
      .catch((error) => {
        console.error("Error al restablecer la contraseña:", error);
        Alert.alert("Error al restablecer la contraseña");
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
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleResetPassword}
        >
          {/* Aquí añadí onPress */}
          <Text style={styles.loginButtonText}>Restablecer</Text>
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
    marginTop: 60,
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

export default ResetPassword;
