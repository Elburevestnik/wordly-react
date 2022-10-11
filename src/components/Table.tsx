import React, {useContext, useEffect, useState} from 'react';
import {WordleContext} from '../App';

export interface TableProps {
    attemptNumber: number;
}
export default function Table({attemptNumber}: TableProps) {
    const {inputtedWord, secretWord, countOfLetter, countOfTrying} = useContext(WordleContext);

    const [state, setState] = useState<Array<string[]>>([]);

    useEffect(() => {
        if(attemptNumber !== -1) {
            inputtedWord.split('');
            let newState = [...state];
            newState[attemptNumber] = inputtedWord.split('');
            setState(newState);
        } else {
            setState(Array(countOfTrying).fill(Array(countOfLetter).fill('')))
        }
    }, [inputtedWord, attemptNumber]);

    return (
        <table>
            <tbody>
            {state.map((item: any, index: number) => {
                return (<tr key={index.toString()}>
                    {item.map((item: any, idx: number) => {
                        return (<td style={{
                            border: '1px solid white',
                            width: '30px',
                            height: '30px',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            color: secretWord.includes(item) ? 'deepskyblue' : 'white',
                        }} key={index.toString() + idx.toString()}>{item}</td>)
                    })}
                </tr>);
            })}
            </tbody>
        </table>
    );
}