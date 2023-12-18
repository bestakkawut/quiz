import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const LeaderBoard = () => {
  const leaderBoard = useSelector(
    (state: any) => state.leaderBoard.leaderBoard
  );

  const sortedLeaderBoard = leaderBoard.slice(0).sort((a: any, b: any) => {
    return b.score - a.score;
  })

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Leader board",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.push("/")}>
              <AntDesign
                name="arrowleft"
                size={24}
                style={{
                  color: "#fff",
                  marginLeft: Platform.OS === "web" ? 20 : 0,
                }}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={[styles.row, styles.rowHeader]}>
            <View style={[styles.column, { width: "20%" }]}>
              <TextColumn header text={"ID"} />
            </View>
            <View style={[styles.column, { width: "60%" }]}>
              <TextColumn header text={"Name"} />
            </View>
            <View style={[styles.column]}>
              <TextColumn header text={"Score"} />
            </View>
          </View>

          {sortedLeaderBoard && sortedLeaderBoard.map((item: any, index: number) => (
            <View key={index} style={styles.row}>
              <View style={[styles.column, { width: "20%" }]}>
                <TextColumn text={index + 1} />
              </View>
              <View style={[styles.column, { width: "60%" }]}>
                <TextColumn text={item.name} />
              </View>
              <View style={[styles.column, { width: "20%" }]}>
                <TextColumn text={item.score} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// generate a column of text
const TextColumn = ({
  text,
  header,
}: {
  text: string | number;
  header?: boolean;
}) => {
  return (
    <Text
      style={[
        styles.textColumn,
        header && styles.columnHeader,
        { textAlign: "center" },
      ]}
    >
      {text}
    </Text>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {},
  backToHome: {
    width: "auto",
    minWidth: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    border: "1px solid black",
    borderRadius: 10,
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  rowHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "#f4511e",
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  columnHeader: {
    color: "#f4511e",
    fontWeight: "bold",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textColumn: {
    fontSize: 20,
  },
});
