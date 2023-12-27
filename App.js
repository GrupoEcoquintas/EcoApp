import React from "react";
import Navigation from "./src/components/navigation/Navigation";
import { UserIdProvider } from './src/components/navigation/Context'; // Ajusta la ruta según sea necesario

export default function App() {
  return (
  <UserIdProvider>
    <Navigation />
  </UserIdProvider>
  );
}
