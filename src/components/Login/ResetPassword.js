import React from 'react'
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

function ResetPassword() {
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

export default ResetPassword