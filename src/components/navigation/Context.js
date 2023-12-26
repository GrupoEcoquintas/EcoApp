import React, { createContext, useContext, useState } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [dataPropiedades, setDataPropiedades] = useState(null); // Añadir estado para dataPropiedades


  return (
    <UserIdContext.Provider value={{ userId, setUserId, dataPropiedades, setDataPropiedades }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error('useUserId debe ser usado dentro de un UserIdProvider');
  }
  return context;
};
