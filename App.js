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


export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginPressed = () => {
    Alert.alert("Completed Login!");
  };

  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={styles.background}
    >
      <View>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
        <Text style={styles.text}>En donde nace la Felicidad.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Correo electrónico"
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={loginPressed}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
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
    width: 280,
    height: 280,
    marginLeft: "15%",
    marginTop: "10%",
  },
  text: {
    color: "white",
    marginTop: "-5%",
    marginLeft: "15%",
    marginBottom: 50,
  },
  loginButton: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 25,
  },
  loginButtonText: {
    backgroundColor: "#168039",
    color: "white",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 27,
    paddingVertical: 10,
  },
  inputView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    alignItems: "center",
    marginLeft: 50,
    marginBottom: 10,
  },
  TextInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  forgot_button: {
    alignSelf: "center",
    height: 20,
    marginTop: 15,
    marginBottom: 30,
  },
});
