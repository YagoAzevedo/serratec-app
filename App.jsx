import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import "react-native-gesture-handler";
import Menu from './components/Menu';
import { UsuarioProvider } from "./context";

export default function App() {
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 1000);
  }, []);

  return (
    <UsuarioProvider>
      <NativeBaseProvider>
        { !carregando ? <Menu /> : <Text>Carregando</Text>}
        <StatusBar
          backgroundColor="blue"
          style="dark"
          barStyle="dark-content"
        />
      </NativeBaseProvider>
    </UsuarioProvider>
  );
}
