import axios from "axios";
import {
  Box, HStack, Pressable, Spacer, VStack
} from 'native-base';
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    axios.get("https://secret-headland-69654.herokuapp.com/alunos")
    .then(response => {
      setAlunos(response.data)
    });
  }, []);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
    <Box>
      <Pressable onPress={() => console.log('You touched me')} bg="white">
        <Box
          pl="4"
          pr="5"
          py="2"
          >
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="coolGray.800"  _dark={{ color: 'warmGray.50' }}  bold>
                {item.nome}
              </Text>
              <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.cidade}</Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
              {`${item.idade} anos`}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  )};

  return (
  <>
    <SwipeListView
      data={alunos}
      renderItem={renderItem}
    />
  </>);
};

export default Alunos;
