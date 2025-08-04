
//MainSreen

import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }: any) {

  const handleLogout = () => {
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
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
    
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Supplies')}
      >
        <Text style={styles.buttonText}>Solicitar Suprimentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Requests')}
      >
        <Text style={styles.buttonText}>Minhas Solicitações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
