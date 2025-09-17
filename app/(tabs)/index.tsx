import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductoItem from "../../components/ProductoItem";

interface Producto {
  id: string;
  title: string;
  price: number;
  description: string;
  image: any;
  favorito: boolean;
}

export default function Galeria() {
  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: "1",
      title: "Mouse Gamer",
      price: 12000,
      description: "Mouse gamer con luces RGB.",
      image: require("../../assets/images/mouse_gamer.jpg"),
      favorito: false,
    },
    {
      id: "2",
      title: "Teclado Mecánico",
      price: 35000,
      description: "Teclado mecánico retroiluminado.",
      image: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvpDJxiiFnJwrBqnGph5A2mYePQoHfR6alg&s",
      },
      favorito: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<
    "cover" | "contain" | "stretch"
  >("cover");
  const [imgKey, setImgKey] = useState(0);

  const handlePress = (item: Producto) => {
    setProductoSeleccionado(item);
    setModalVisible(true);
  };

  const handleLongPress = (item: Producto) => {
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
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContent}>
          {productoSeleccionado && (
            <>
              <View style={styles.imageContainer}>
                <Image
                  key={imgKey}
                  source={productoSeleccionado.image}
                  style={styles.modalImage}
                  resizeMode={resizeMode}
                />
              </View>

              <Text style={styles.modalTitle}>
                {productoSeleccionado.title}
              </Text>
              <Text style={styles.modalDesc}>
                {productoSeleccionado.description}
              </Text>

              {/* Botones para cambiar resizeMode */}
              <View style={styles.buttons}>
                {["cover", "contain", "stretch"].map((mode) => (
                  <Pressable
                    key={mode}
                    style={[
                      styles.button,
                      resizeMode === mode && styles.buttonActive,
                    ]}
                    onPress={() => {
                      setResizeMode(mode as any);
                      setImgKey((k) => k + 1);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Text>
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
  modalContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 250, // alto fijo para la imagen
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDesc: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  buttons: { flexDirection: "row", marginBottom: 20 },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonActive: { backgroundColor: "#0a84ff" },
  buttonText: { color: "#fff" },
});
