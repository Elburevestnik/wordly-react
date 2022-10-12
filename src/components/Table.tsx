import React, {useRef, useState} from 'react';
import {store} from '../App';

export default function Table() {
    const secretWord = useRef('');
    const [previousAttempts, setPreviousAttempts] = useState<string[][]>([]);
    store.subscribe(() => {
        secretWord.current = store.getState().secretWord;
        setPreviousAttempts(store.getState().previousAttempts);
    })
    return (
        <table>
            <tbody>
            {previousAttempts.map((item: any, index: number) => {
                return (<tr key={index.toString()}>
                    {item.map((item: any, idx: number) => {
                        return (<td style={{
                            border: '1px solid white',
                            width: '30px',
                            height: '30px',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            color: secretWord.current.includes(item) ? 'deepskyblue' : 'white',
                        }} key={index.toString() + idx.toString()}>{item}</td>)
                    })}
                </tr>);
            })}
            </tbody>
        </table>
    );
}