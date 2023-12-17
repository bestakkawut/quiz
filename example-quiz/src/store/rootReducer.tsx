import { configureStore } from '@reduxjs/toolkit';

import leaderBoardReducer from './leaderBoardSlice';
import quizReducer from './quizSlice';

const store = configureStore({
	reducer: {
		leaderBoard: leaderBoardReducer,
		quiz: quizReducer,
	},
});

export default store;