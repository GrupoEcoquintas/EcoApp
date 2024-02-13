import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [dataPropiedades, setDataPropiedades] = useState(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(""); // Nuevo estado para el nombre de usuario

  useEffect(() => {
    // Carga el nombre de usuario almacenado al iniciar la aplicación
    const loadStoredUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error("Error al cargar el nombre de usuario almacenado", error);
      }
    };

    loadStoredUserName();
  }, []);

  return (
    <UserIdContext.Provider
      value={{
        userId,
        setUserId,
        dataPropiedades,
        setDataPropiedades,
        email,
        setEmail,
        userName, // Hazlo disponible en el contexto
        setUserName, // Permite actualizar el nombre de usuario en el contexto
      }}
    >
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error("useUserId debe ser usado dentro de un UserIdProvider");
  }
  return context;
};
