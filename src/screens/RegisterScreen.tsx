//registerscreen

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const newUser = { name: name.trim(), email: name.trim(), password: name.trim() };

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const emailExists = users.find((user: any) => user.email === email);

      if (emailExists) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado');
        return;
      }

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Sucesso', 'Usuário cadastrado!');
      console.log('Usuário salvo:', newUser);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:30, backgroundColor:'#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign:'center' },
  input: { height: 45, borderColor:'#ccc', borderWidth:1, marginBottom:15, paddingHorizontal:10, borderRadius:8 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    width: 120,
    alignSelf: 'center',
  },
  buttonText: { color:'#fff', fontWeight:'bold', fontSize:16, textAlign:'center' },
  linkText: { textAlign:'center', color:'#007AFF', fontSize:16 },
});
