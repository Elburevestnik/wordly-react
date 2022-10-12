import {Action} from "../constants/action.enum";
import {WordleModel} from "../models/wordle.model";
import {ActionModel} from "../models/action.model";

export function Reducer(state: WordleModel, action: ActionModel): WordleModel {
    const emptyPreviousAttempts: string[][] = Array(state.countOfTrying).fill(Array(state.countOfLetter).fill(''));
    switch (action.type) {
        case Action.GenerateSecretWord:
            return {...state, secretWord: action.payload?.secretWord || ''};
        case Action.ResetGame:
            return {...state, attemptNumber: -1, previousAttempts: emptyPreviousAttempts, inputtedWord: ''};
        case Action.FillAttemptInfo:
            let tempArr: Array<string[]> = [...state.previousAttempts];
            action.payload?.inputtedWord && (tempArr[state.attemptNumber] = action.payload.inputtedWord.split(''));
            return {...state, attemptNumber: state.attemptNumber + 1, previousAttempts: tempArr, inputtedWord: action.payload?.inputtedWord as string};
        default:
            let temp: Array<string[]> = state.previousAttempts ? [...state.previousAttempts] : emptyPreviousAttempts;
            return {...state, previousAttempts: temp};
    }
}