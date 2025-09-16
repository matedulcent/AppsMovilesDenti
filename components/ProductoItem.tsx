import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductoItem({ item, onPress, onLongPress }) {
    return (
        <Pressable
            onPress={() => onPress(item)}
            onLongPress={() => onLongPress(item)}
            style={[styles.card, item.favorito && styles.favorito]}
        >
            <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3
    },
    favorito: {
        borderWidth: 2,
        borderColor: "red",
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        color: "green",
    },
});
