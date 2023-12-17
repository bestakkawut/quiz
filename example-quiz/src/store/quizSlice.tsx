import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	answerQuiz: [],
	start: false,
	state: "idle",
	loading: false,
	error: null,
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		setQuizState: (state, action: PayloadAction<any>) => {
			state.state = action.payload;
		},
		setAnswerQuiz: (state, action: PayloadAction<any>) => {
			state.state = action.payload.state;
			state.answerQuiz = action.payload.answers;
		},
	},
});

export const {
	setQuizState,
	setAnswerQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;