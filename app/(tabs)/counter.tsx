import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(prev => prev + 1);
  };

  const reset = () => {
    setContador(0);
  };

  const decrementar = () => {
    setContador(prev => prev - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contador}>Contador: {contador}</Text>

      <Pressable onPress={incrementar} onLongPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>Incrementar</Text>
      </Pressable>

      <Pressable onPress={decrementar} onLongPress={reset} style={styles.button}>
        <Text style={styles.buttonText} >Decrementar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    padding: 20,
    borderRadius: 100,
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    padding: 30,
    backgroundColor: '#6e3604ff',
    marginTop: 50,
    borderRadius: 10,
    fontSize: 10,
  },
  contador: {
    padding: 20,
    backgroundColor: '#6406fdff',
    borderRadius: 100,
    margin: 20,
    fontSize: 50,
  }


});