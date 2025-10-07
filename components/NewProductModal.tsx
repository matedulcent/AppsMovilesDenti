import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { Product } from '../app/api/products';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (payload: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
};

export default function NewProductModal({ visible, onClose, onSave }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSave = async () => {
        if (!title || !price) return;
        await onSave({ title, description, price: parseFloat(price), imageUrl: '' });
        setTitle(''); setDescription(''); setPrice('');
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modal}>
                <Text style={styles.header}>Nuevo Producto</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />

                <View style={styles.btns}>
                    <Button title="Guardar" onPress={handleSave} />
                    <Button title="Cancelar" color="red" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: { flex: 1, padding: 20, justifyContent: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
        padding: 8, marginBottom: 12,
    },
    btns: { flexDirection: 'row', justifyContent: 'space-around' },
});
