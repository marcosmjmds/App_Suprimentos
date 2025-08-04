import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SuppliesScreen from './src/screens/SuppliesScreen';
import RequestsScreen from './src/screens/RequestsScreen';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Supplies: undefined;
  Requests: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={({ navigation }) => ({
            title: 'Menu Principal',
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                Alert.alert('Sair', 'Deseja realmente sair?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    },
                  },
                ]);
              }}>
                <Text style={{ color: '#007AFF', marginRight: 10, fontWeight: 'bold' }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Supplies"
          component={SuppliesScreen}
          options={({ navigation }) => ({
            title: 'Suprimentos',
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                Alert.alert('Sair', 'Deseja realmente sair?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    },
                  },
                ]);
              }}>
                <Text style={{ color: '#007AFF', marginRight: 10, fontWeight: 'bold' }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
        name="Requests"
        component={RequestsScreen}
        options={({ navigation }) => ({
          title: 'Solicitações',
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              Alert.alert('Sair', 'Deseja realmente sair?', [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Sair',
                  style: 'destructive',
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                  },
                },
              ]);
            }}>
              <Text style={{ color: '#007AFF', marginRight: 10, fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          ),
        })}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
