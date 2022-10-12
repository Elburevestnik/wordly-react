import React, {useEffect, useRef} from 'react';
import {store} from "../App";
import {Action} from "../constants/action.enum";

async function getWords(countOfLetter: number) {
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=10000');
    let words: string[] = await response.json();
    return words.filter((word: string) => word.length === countOfLetter);
}

export function useWords(countOfLetter: number): {secretWord: string, trigger: () => void} {
    const secretWord = useRef<string>('world');
    const words = useRef<string[]>([]);
    function trigger() {
        const temp = words.current.filter((word) => word !== secretWord.current);
        secretWord.current = temp[Math.floor(Math.random() * temp.length)];
        store.dispatch({type: Action.GenerateSecretWord, payload: {secretWord: secretWord.current}});
    }
    useEffect(() => {
        getWords(countOfLetter).then((response) => words.current = response).then(() => (trigger()));
    },[])

    return {
        secretWord: secretWord.current,
        trigger: trigger
    };
}