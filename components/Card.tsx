import { Pressable, StyleSheet, Text } from "react-native";

export default function Card({ texto }: { texto: string }) {
    const [active, setActive] = require("react").useState(false);

    return (
        <Pressable
            onPress={() => setActive(!active)}
            style={[styles.card, { backgroundColor: active ? "red" : "white" }]}
        >
            <Text style={[styles.textLabel, { color: active ? "white" : "black" }]}>
                {texto}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
