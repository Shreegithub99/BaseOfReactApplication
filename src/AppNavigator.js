import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import ParentNavigation from './screens/ParentNavigation.js';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
   const fetchData = async () => {
  try {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  } catch (error) {
    console.error(error);
  }
};
    fetchData();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
          {/* <Stack.Screen name="AppNavigator" component={AppNavigator} /> */}
          <Stack.Screen
          name="ParentNavigation"
          component={ParentNavigation}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default AppNavigator;