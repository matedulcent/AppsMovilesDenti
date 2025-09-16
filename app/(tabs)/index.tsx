import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable, StyleSheet,
  Text, TextInput,
  View
} from "react-native";
import ProductoItem from "../../components/ProductoItem";

export default function Galeria() {
  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState([
    {
      id: "1",
      title: "Mouse Gamer",
      price: 12000,
      description: "Mouse gamer con luces RGB.",
      image: require("../assets/mouse.png"), // ✅ imagen local
      favorito: false,
    },
    {
      id: "2",
      title: "Teclado Mecánico",
      price: 35000,
      description: "Teclado mecánico retroiluminado.",
      image: { uri: "https://i.imgur.com/8Km9tLL.png" }, // ✅ imagen por URL
      favorito: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [resizeMode, setResizeMode] = useState("cover");

  const handlePress = (item) => {
    setProductoSeleccionado(item);
    setModalVisible(true);
  };

  const handleLongPress = (item) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, favorito: !p.favorito } : p
      )
    );
  };

  const filteredData = productos.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Galería de Productos</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar producto..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductoItem
            item={item}
            onPress={handlePress}
            onLongPress={handleLongPress}
          />
        )}
      />

      {/* Modal de detalle */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          {productoSeleccionado && (
            <>
              <Image
                source={productoSeleccionado.image}
                style={styles.modalImage}
                resizeMode={resizeMode}
              />
              <Text style={styles.modalTitle}>{productoSeleccionado.title}</Text>
              <Text style={styles.modalDesc}>
                {productoSeleccionado.description}
              </Text>

              <View style={styles.buttons}>
                {["cover", "contain", "stretch"].map((mode) => (
                  <Pressable
                    key={mode}
                    style={styles.button}
                    onPress={() => setResizeMode(mode)}
                  >
                    <Text style={styles.buttonText}>{mode}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f4f4f4" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  modalContent: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  modalImage: { width: 250, height: 250, marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDesc: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  buttons: { flexDirection: "row", marginBottom: 20 },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: { color: "#fff" },
});
