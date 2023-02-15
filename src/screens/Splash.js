import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ParentNavigation');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;