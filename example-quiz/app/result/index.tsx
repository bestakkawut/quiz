import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questions } from "../../src/libs/quiz";
import { Stack, router } from "expo-router";
import {
  setLeaderBoardScore,
} from "../../src/store/leaderBoardSlice";

const Result = () => {
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => state.quiz);
  const leaderBoard = useSelector((state: any) => state.leaderBoard);
	console.log('leaderBoard', leaderBoard)
  const maxScore = 20;
  const [countScore, setCountScore] = useState(0);

  const checkCorrectAnswer = (answer: any) => {
    console.log("answer", answer);
    const correctAnswer = questions.find(
      (question: any) => question.id === answer.id
    );
    console.log("correctAnswer", correctAnswer?.correctAnswer === answer.value);
    return correctAnswer?.correctAnswer === answer.value;
  };

  useEffect(() => {

    if (leaderBoard.currentUser === '') { return; }

		let countScore = 0;
    quiz.answerQuiz.forEach((answer: any) => {
      const correct = checkCorrectAnswer(answer);
			if (correct) {
				countScore += 1;
      }
    });
        
		setCountScore(countScore);

    dispatch(
      setLeaderBoardScore({
        name: leaderBoard.currentUser,
        score: countScore,
      })
    );
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 36 }}>
      <Stack.Screen
        options={{
          title: "Result",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 26, color: "#f4511e", fontWeight: "bold" }}>
          Score
        </Text>
        <Text
          style={{ fontSize: 40, color: "#f4511e" }}
        >{`${countScore}/${maxScore}`}</Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable style={styles.buttonPrimary} onPress={() => router.replace('/leader-board')}>
          <Text style={{ color: "#fff" }}>LeaderBoard</Text>
        </Pressable>
        <Pressable style={styles.buttonSecondary} onPress={() => router.replace('/')}>
          <Text style={{ color: "#000" }}>Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
	},
	buttonSecondary: {
    alignItems: "center",
    backgroundColor: "#ccc",
    paddingHorizontal: 5,
    paddingVertical: 20,
    margin: 12,
    borderRadius: 10,
  },
	buttonPrimary: {
    alignItems: "center",
    backgroundColor: "#f4511e",
    paddingHorizontal: 5,
    paddingVertical: 20,
    margin: 12,
    borderRadius: 10,
  },
  footerContainer: {
		flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});
