// generate code createSlice as leaderboardSlice with initialState and reducers

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaderBoardState } from "./leaderBoardTypes";

const initialState: LeaderBoardState = {
	currentUser: '',
	leaderBoard: [],
};

const leaderBoardSlice = createSlice({
	name: "leaderBoard",
	initialState,
	reducers: {
		setLeaderBoardScore: (state, action: PayloadAction<any>) => {
			state.leaderBoard.push({ name: action.payload.name, score: action.payload.score })
		},
		setCurrentUser: (state, action: PayloadAction<any>) => {
			state.currentUser = action.payload
		},
	},
});

export const {
	setLeaderBoardScore,
	setCurrentUser,
} = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;