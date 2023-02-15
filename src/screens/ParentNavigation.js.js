import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import DrawerNavigator from '../drawer/DrawerNavigator';
const ParentNavigation = () => {
  return (
    <SafeAreaView
      style={{flex: 1}}>
      <DrawerNavigator />
    </SafeAreaView>
  );
};

export default ParentNavigation;