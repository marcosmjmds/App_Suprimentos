// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { validateLogin, getUsers } from '../utils/storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const isValid = await validateLogin(email.trim(), senha.trim());
  
    const users = await getUsers();
    console.log('Usuários salvos:', users);
  
    if (isValid) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos!');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Cadastrar-se</Text>
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