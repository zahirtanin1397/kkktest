import '@azure/core-asynciterator-polyfill';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DataStore } from 'aws-amplify/datastore';
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import amplifyconfig from './src/amplifyconfiguration.json';
import {Todo} from "./src/models";
Amplify.configure(amplifyconfig);
export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todos = await DataStore.query(Todo);
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
