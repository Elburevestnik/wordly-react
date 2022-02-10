import React from 'react';

async function Words(countOfLetter: number) {
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=10000');
    let words: string[] = await response.json();
    return words.filter((word: string) => word.length === countOfLetter);
}

export default Words;