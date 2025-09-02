import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function Card({ text }) {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPress={() => setActive(!active)}
      style={[styles.card, { backgroundColor: active ? "red" : "white" }
      ]}
    >
      <Text style={[styles.textLabel, { color: active ? "white" : "black" }]}>
        {text}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const items = ["A", "B", "C", "D"];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Card key={index} text={item} /> //Use el key porque los children tienen que ser unicos. El text es un prop.
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    backgroundColor: "#ffffffff",
  },

  textLabel: {
    fontSize: 50,
  },

  card: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
});
