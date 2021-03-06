import { AntDesign } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect } from "react";
import Login from "../pages/Login";
import TesteStack from "../pages/TesteStack";
import { UsuarioContext } from "../context";
import Alunos from "../pages/Alunos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cadastro from "../pages/Cadastro";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "Alunos":
      return "user";
    case "Login":
      return "login";
    case "Materias":
      return "book";
    case "Sair":
      return "logout";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  const { setUsuario } = useContext(UsuarioContext);
  const renderLogout = () => {
    return (
      <Pressable
        px="5"
        py="3"
        rounded="md"
        bg={"transparent"}
        onPress={() => {
          setUsuario(undefined);
          AsyncStorage.removeItem("@usuario").then(() => {
            props.navigation.navigate("Login");
          });
        }}
      >
        <HStack space="7" alignItems="center">
          <Icon
            color={"#A2A1A6"}
            size="5"
            as={<AntDesign name={getIcon("Sair")} />}
          />
          <Text
            fontWeight="500"
            color={"#A2A1A6"}
          >
            Sair
          </Text>
        </HStack>
      </Pressable>
    );
  };
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="#A2A1A6">
            {props.usuario?.nome}
          </Text>
          <Text fontSize="14" mt="1" color="#A2A1A6" fontWeight="500">
            {props.usuario?.email}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(154, 224, 236, 0.1)"
                    : "transparent"
                }
                onPress={() => {
                  props.navigation.navigate(name);
                }}
                key={index}
                style={name === "Cadastro" ? {
                  display: 'none'
                }: null}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={index === props.state.index ? "#504AFF" : "#A2A1A6"}
                    size="5"
                    as={<AntDesign name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={index === props.state.index ? "#504AFF" : "#A2A1A6"}
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
            {renderLogout()}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

function MyDrawer({ usuario }) {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent usuario={usuario} {...props} />
        )}
        screenOptions={{ headerShown: usuario ? true : false }}
        initialRouteName={usuario ? "Alunos" : "Login"}
      >
        <Drawer.Screen name="Alunos" component={Alunos} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Materias" component={Login} />
        <Drawer.Screen name="Cadastro" component={Cadastro} />
      </Drawer.Navigator>
    </Box>
  );
}

export default function Menu() {
  const { usuario } = useContext(UsuarioContext);

  return (
    <NavigationContainer>
      <MyDrawer usuario={usuario} />
    </NavigationContainer>
  );
}
