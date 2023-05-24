import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus componentes de pantalla
import LoginScreen from '../Login/LoginScreen';
import LoginSuccess from '../Login/LoginSuccess';
// Importa más pantallas si es necesario

// Crea una instancia de Stack Navigator
const Stack = createStackNavigator();

// Configura la pila de navegación
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
        {/* Agrega más pantallas y configuraciones de navegación aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
