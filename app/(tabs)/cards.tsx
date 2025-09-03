const { StyleSheet, View } = require("react-native");
import Card from '../../components/Card';

export default function HomeScreen() {
  const items = ["A", "B", "C", "D"];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Card key={index} texto={item} />
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
});
