import React, {useRef, useState} from 'react';
import './App.css';
import Table from './components/Table';
import {useWords} from "./components/Words";
import {createStore, Store} from "redux";
import {Reducer} from "./store/reducer";
import {WordleModel} from "./models/wordle.model";
import {Action} from "./constants/action.enum";
import {ActionModel} from "./models/action.model";

// @ts-ignore
export let store: Store<WordleModel, ActionModel> = createStore(Reducer, {
    inputtedWord: '',
    previousAttempts: null,
    secretWord: '',
    attemptNumber: 0,
    countOfLetter: 5,
    countOfTrying: 6,
});

function App() {
    const {countOfLetter, countOfTrying}: WordleModel = store.getState();
    const inputRef = useRef<HTMLInputElement>(null);
    const [gameOvered, setGameOvered] = useState(false);
    const inputWord = () => {
        if (inputRef.current?.value) {
            store.dispatch({type: Action.FillAttemptInfo, payload: {inputtedWord: inputRef.current.value}})
            inputRef.current && (inputRef.current.value = '');
        }
    };

    const {secretWord, trigger} = useWords(countOfLetter);

    store.subscribe(() => {
        const {inputtedWord, attemptNumber, secretWord} = store.getState();
        if (inputtedWord === secretWord || countOfTrying === attemptNumber) {
            setGameOvered(true);
        }
    })

    const resetGame = () => {
        setGameOvered(false);
        store.dispatch({type: Action.ResetGame})
        trigger();
    }

    return (
        <div className="App">
            <main className="App-header">
                <Table/>
                <input ref={inputRef} type="text" style={{marginTop: '10px'}} maxLength={countOfLetter} disabled={gameOvered}></input>
                <button onClick={() => {
                    inputWord();
                }} style={{marginTop: '10px'}} disabled={gameOvered}>Let's try</button>
               <React.Fragment>
                   {gameOvered && <div style={{height: '100px', width: '100px'}}>
                        <p>The End!</p>
                        <button onClick={() => {
                            resetGame();
                        }}>Close</button>
                    </div>}
                </React.Fragment>
            </main>
        </div>
    );
}

export default App;
