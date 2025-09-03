import { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function Perfil() {
  const [nombre, setNombre] = useState('Juan Perez');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const abrirModal = () => {
    setNuevoNombre(nombre);
    setModalVisible(true);
  };

  const guardarCambios = () => {
    setNombre(nuevoNombre);
    setModalVisible(false);
  };

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Nombre: {nombre} </Text>
      <Button title="Cambiar nombre" onPress={abrirModal} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ingrese nuevo nombre:</Text>

            <TextInput
              style={styles.input}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Nombre"
            />

            <Button title="Guardar" onPress={guardarCambios} />

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  text: { fontSize: 20, marginBottom: 16 },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, marginBottom: 12 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },

});
