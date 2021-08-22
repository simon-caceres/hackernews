import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Root" 
        component={HomeScreen} 
        options={{ 
          headerTitleAlign: 'center',
          headerTintColor: '#e2e2e2',  
          headerShown: true, 
          title: 'Hacker News:' ,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#367edb'
          }
        }} 
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name="Modal" 
          component={ModalScreen}
          options={{ 
            headerTitleAlign: 'center',
            headerTintColor: '#e2e2e2',  
            headerShown: true, 
            title: 'News Detail:' ,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#367edb'
            }
          }} 
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

