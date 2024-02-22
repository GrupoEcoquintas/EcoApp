import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [dataPropiedades, setDataPropiedades] = useState(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Carga inicial de datos almacenados
    const loadData = async () => {
      try {
        // Intenta cargar el userName almacenado
        const storedUserName = await AsyncStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }
        // Aquí puedes agregar la carga de más datos si es necesario
      } catch (error) {
        console.error("Error al cargar datos almacenados", error);
      }
    };

    loadData();
  }, []);

  // Observa el cambio en userName y lo almacena localmente
  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("userName", userName);
      } catch (error) {
        console.error("Error al almacenar el userName", error);
      }
    };

    if (userName) {
      storeData();
    }
  }, [userName]);

  const contextValue = {
    userId,
    setUserId,
    dataPropiedades,
    setDataPropiedades,
    email,
    setEmail,
    userName,
    setUserName,
  };

  return <UserIdContext.Provider value={contextValue}>{children}</UserIdContext.Provider>;
};

export const useUserId = () => useContext(UserIdContext);

