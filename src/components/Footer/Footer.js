import React from "react";
import { Box, Text, HStack, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <Box bg="indigo.600" py={4}>
      <HStack justifyContent="center">
        <Icon
          as={<MaterialCommunityIcons name="home" />}
          color="white"
          size="sm"
          mr={2}
        />
        <Text color="white">Inicio</Text>
      </HStack>
    </Box>
  );
};

export default Footer;
