import React, {useEffect, useState} from 'react';
import './App.css';
import Words from './components/Words';
import Table from './components/Table';

const countOfLetter: number = 5;
const countOfTrying: number = 6;
let round: number = 0;

function App() {
    const [words, setWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>('');

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

    useEffect(() => {
        const initWord = async function() {
            let wordList: string[] = await Words(countOfLetter);
            setWords(wordList);
            setSelectedWord(wordList[round]);
        }

        initWord();
    },[])

    return (
        <div className="App">
            <main className="App-header">
                <Table word={selectedWord} countOfLetter={countOfLetter} countOfTrying={countOfTrying}/>
                <button>Next Round</button>
            </main>
        </div>
    );
}

export default App;
