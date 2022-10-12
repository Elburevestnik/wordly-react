export type WordleModel = {
    secretWord: string;
    inputtedWord: string;
    previousAttempts: Array<string[]>;
    attemptNumber: number;
    countOfLetter: number;
    countOfTrying: number;
}