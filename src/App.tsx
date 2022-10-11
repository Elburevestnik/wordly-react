import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import Table from './components/Table';

export const WordleContext = createContext({
    secretWord: '',
    inputtedWord: '',
    countOfLetter: 5,
    countOfTrying: 6,
});

function App() {
    const {countOfTrying, countOfLetter} = useContext(WordleContext);
    const [secretWord, setSecretWord] = useState<string>('world');
    const [inputtedWord, setInputtedWord] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const attemptNumber = useRef<number>(-1);
    const [gameOvered, setGameOvered] = useState(false);
    const inputWord = () => {
        attemptNumber.current++;
        const value = inputRef.current || {value: ''};
        setInputtedWord(value.value);
        inputRef.current && (inputRef.current.value = '');
    };

    useEffect(() => {
        setSecretWord('world');
    });

    useEffect(() => {
        if (inputtedWord === secretWord || countOfTrying === attemptNumber.current) {
            setGameOvered(true);
        }
    }, [inputtedWord])
    // const initWord = async function f() {
    //     let wordList: string[] = [];
    //     if (!round) {
    //         wordList = await Words(countOfLetter);
    //         setWords(wordList);
    //         setSelectedWord(wordList[round]);
    //     } else if (words.length < round) {
    //         round = 0;
    //         f();
    //     } else {
    //         setSelectedWord(wordList[round]);
    //     }
    // }

    // initWord();

    return (
        <div className="App">
            <main className="App-header">
                <WordleContext.Provider value={{inputtedWord: inputtedWord, secretWord: secretWord, countOfLetter: countOfLetter, countOfTrying: countOfTrying}}>
                    <Table attemptNumber={attemptNumber.current}/>
                </WordleContext.Provider>
                <input ref={inputRef} type="text" style={{marginTop: '10px'}} maxLength={countOfLetter} disabled={gameOvered}></input>
                <button onClick={() => {inputWord()}} style={{marginTop: '10px'}} disabled={gameOvered}>Let's try</button>
               <React.Fragment>
                   {gameOvered && <div style={{height: '100px', width: '100px'}}>
                        <p>The End!</p>
                        <button onClick={() => (setGameOvered(false))}>Close</button>
                    </div>}
                </React.Fragment>
            </main>
        </div>
    );
}

export default App;
