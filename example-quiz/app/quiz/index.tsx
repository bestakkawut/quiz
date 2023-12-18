import {
	Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import QuestionGroup from "../../src/components/QuestionGroup";
import { questions } from "../../src/libs/quiz";
import { setAnswerQuiz, setQuizState } from "../../src/store/quizSlice";

const Quiz = () => {
  const maxQuestions = 20;
  const quiz = useSelector((state: any) => state.quiz);
  const isQuizStart = quiz.state === "start";
  const dispatch = useDispatch();
  const [questionData, setQuestionData] = useState(
    [] as { id: number; question: string; options: string[] }[]
  );
  const [answering, setAnswering] = useState(
    [] as { id: number; value: string }[]
  );

  const randomizeAnswers = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const randomizeQuestions = useCallback(() => {
    const shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    const questionList = shuffleQuestions.map((question: any) => {
      return {
        id: question.id,
        question: question.question,
        options: randomizeAnswers(question.options),
      };
    });
    setQuestionData(questionList);
  }, [questions, randomizeAnswers]);

  useEffect(() => {
    randomizeQuestions();
  }, []);

  const onSetAnswer = ({ id, value }: { id: number; value: string }) => {
    const newAnswer = {
      id,
      value,
    };
    answering.forEach((answer, index) => {
      if (answer.id === id) {
        answering.splice(index, 1);
      }
    });
    setAnswering([...answering, newAnswer]);
  };

  const onFinished = () => {
    dispatch(
      setAnswerQuiz({
        answers: answering,
        state: "finished",
      })
    );
    router.push("/result");
  };

  const onGiveUp = () => {
    dispatch(setQuizState("idle"));
    router.replace("/");
  };

  return (
      <ScrollView >
          <Stack.Screen
            options={{
              title: "Quiz",
              headerTitleAlign: "center",
              headerRight: () =>
                isQuizStart && (
									<Text
										key={0}
                    style={{ color: "#fff", paddingRight: 10 }}
                  >{`${answering.length}/${maxQuestions}`}</Text>
								),
								headerLeft: () => (
									<Pressable
										onPress={() => router.replace("/")}
									>
										<AntDesign name='arrowleft' size={24} style={{color: '#fff', marginLeft: Platform.OS === 'web' ? 20 : 0 }} />
									</Pressable>
								)
            }}
          />
          <View style={styles.container}>
            {!isQuizStart ? (
              <Pressable
                style={styles.buttonPrimary}
                onPress={() => router.replace("/")}
              >
                <Text style={{ color: "#fff" }}>Back to home</Text>
              </Pressable>
            ) : (
              <>
                {questionData.map((question, index) => (
                  <View key={index} style={styles.questionContainer}>
                    <Text style={styles.question}>{question.question}</Text>
                    <QuestionGroup
                      id={question.id}
                      options={question.options}
                      onSetAnswer={onSetAnswer}
                    />
                  </View>
                ))}
                <View style={styles.footerContainer}>
                  <Pressable style={styles.buttonPrimary} onPress={onFinished}>
                    <Text style={{ color: "#fff" }}>Finish</Text>
                  </Pressable>
                  <Pressable style={styles.buttonSecondary} onPress={onGiveUp}>
                    <Text style={{ color: "#000" }}>Give up</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
      </ScrollView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
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
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  footerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});
