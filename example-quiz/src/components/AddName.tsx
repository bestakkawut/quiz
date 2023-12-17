import { View, SafeAreaView, TextInput, StyleSheet, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from '../store/leaderBoardSlice';
import { router } from 'expo-router';
import { setQuizState } from '../store/quizSlice';

export default function AddName() {

	const [name, setName] = useState('' as string)
	const dispatch = useDispatch()

	const handleNameChange = (text: string) => {
		setName(text)
	}

	const onSubmit = () => {
		dispatch(setCurrentUser(name))
		dispatch(setQuizState('start'))
		if (name !== '') {
			router.push('/quiz')
		}
	}

  return (
    <SafeAreaView>
      <View>
				<TextInput style={styles.input} placeholder="Add Name" onChangeText={handleNameChange} />
				<Pressable style={styles.button} onPress={onSubmit}>
					<Text style={{ color: '#fff' }}>Start Quiz</Text>
				</Pressable>
			</View>
			
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
		margin: 12,
		textAlign: 'center',
		borderBottomColor: '#f4511e',
    borderBottomWidth: 2,
		padding: 10,
		fontWeight: 'bold',
		outlineWidth: 0,
		placeholderTextColor: 'gray',
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#f4511e',
		padding: 10,
		margin: 12,
		borderRadius: 10,
	}
});
