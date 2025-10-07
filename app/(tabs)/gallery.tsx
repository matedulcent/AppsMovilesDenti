import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import NewProductModal from '../../components/NewProductModal';
import { createProduct, fetchProducts, Product } from '../api/products';

export default function GalleryScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (newProd: Omit<Product, 'id' | 'createdAt'>) => {
        try {
            const created = await createProduct(newProd);
            setProducts(prev => [created, ...prev]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Nuevo producto" onPress={() => setShowModal(true)} />

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>${item.price}</Text>
                            {item.description && <Text style={styles.desc}>{item.description}</Text>}
                        </View>
                    )}
                />
            )}

            <NewProductModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onSave={async (payload) => {
                    await handleCreate(payload);
                    setShowModal(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    card: { padding: 12, marginVertical: 6, borderWidth: 1, borderRadius: 8 },
    title: { fontWeight: 'bold', fontSize: 16 },
    desc: { color: '#444' },
});
