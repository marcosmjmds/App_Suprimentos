//suppliesScreen

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SuppliesScreen({ navigation }: any) {
  const [date, setDate] = useState('');
  const [item, setItem] = useState('Leite');
  const [total, setTotal] = useState('');

  

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');
    setDate(formattedDate);
  }, []);
  
  const handleSave = async () => {
    if (!total) {
      Alert.alert('Erro', 'Informe o total');
      return;
    }
  
    const newRequest = { date, item, total };
    try {
      const existingData = await AsyncStorage.getItem('requests');
      const requests = existingData ? JSON.parse(existingData) : [];
  
      requests.push(newRequest);
      await AsyncStorage.setItem('requests', JSON.stringify(requests));
  
      Alert.alert('Sucesso', `Suprimento salvo:\nData: ${date}\nItem: ${item}\nTotal: ${total}`);
      setItem('Leite');
      setTotal('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a solicitação');
    }
  };

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

      <Text style={styles.title}>Suprimentos</Text>

      <TextInput
        style={styles.input}
        value={date}
        editable={false}
        placeholder="Data"
      />

    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={item}
        onValueChange={(value) => setItem(value)}
        style={styles.picker}
      >
        <Picker.Item label="Leite" value="Leite" />
        <Picker.Item label="Açúcar" value="Açúcar" />
        <Picker.Item label="Café" value="Café" />
      </Picker>
    </View>


      <TextInput
        style={styles.input}
        placeholder="Total"
        keyboardType="numeric"
        value={total}
        onChangeText={setTotal}
      />

      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={handleSave} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 15,
    width: 120,
    alignSelf: 'center',
  },
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
