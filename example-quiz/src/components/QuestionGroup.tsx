import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RadioButton as RadioButtonPaper } from "react-native-paper";

const QuestionGroup = ({
  id,
  options = [],
  onSetAnswer,
}: {
  id: number;
  options: string[];
  onSetAnswer: Function;
}) => {
  const [answered, setAnswered] = useState("" as string);

  const randomizeAnswers = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswerChange = (value: string) => {
    setAnswered(value);
    onSetAnswer({
      id, value 
    })
  };

  return (
    <RadioButtonPaper.Group
      onValueChange={(value) => handleAnswerChange(value)}
      value={answered}
    >
      <View style={styles.answerContainer}>
        {options.map((answer, index) => (
          <View key={index} style={styles.answerOptions}>
            <RadioButtonPaper
              value={answer}
              status={answered === answer ? "checked" : "unchecked"}
            />
            <Text style={styles.answerText} onPress={() => handleAnswerChange(answer)}>{answer}</Text>
          </View>
        ))}
      </View>
    </RadioButtonPaper.Group>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    paddingLeft: 20,
  },
  answerOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  answerText: {
    color: "#f4511e",
  },
});

export default QuestionGroup;
