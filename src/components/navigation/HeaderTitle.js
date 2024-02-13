// HeaderTitle.js
import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useUserId } from "./Context";

const HeaderTitle = () => {
  const { userName } = useContext(useUserId); // Accede al userName desde el contexto

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
      />
      <View>
        <Text style={{ color: 'white', fontSize: 16 }}>Bienvenido</Text>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          {userName || 'Usuario Anónimo'}
        </Text>
      </View>
    </View>
  );
};

export default HeaderTitle;
