import AddName from "../src/components/AddName";
import { Stack, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Stack.Screen
        options={{
          title: "My home",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/leader-board")}
              style={styles.leaderBoardButton}
            >
              <Text style={styles.leaderBoardText}>Leader board</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.bodyContainer}>
        <AddName />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderBoardText: {
    color: "#fff",
  },
  leaderBoardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});
