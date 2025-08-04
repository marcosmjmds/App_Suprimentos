import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestsScreen() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const stored = await AsyncStorage.getItem('requests');
      const parsed = stored ? JSON.parse(stored) : [];
      setRequests(parsed);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancel = (indexToRemove: number) => {
    Alert.alert('Cancelar Solicitação', 'Deseja realmente cancelar esta solicitação?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: async () => {
          const updated = [...requests];
          updated.splice(indexToRemove, 1);
          await AsyncStorage.setItem('requests', JSON.stringify(updated));
          setRequests(updated);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.item}>
      <Text>Data: {item.date}</Text>
      <Text>Item: {item.item}</Text>
      <Text>Total: {item.total}</Text>

      <TouchableOpacity onPress={() => handleCancel(index)} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitações</Text>
      <FlatList
        data={requests}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nenhuma solicitação encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
