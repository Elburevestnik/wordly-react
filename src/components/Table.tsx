import React from 'react';
export interface TableProps {
    word: string;
    countOfLetter: number;
    countOfTrying: number;
}
export default function Table(props: TableProps) {
    return (
        <table>
            <tbody>
            {Array.from(Array(props.countOfTrying)).map((item: any, index: number) => {
                return <tr key={index.toString()}>
                    {Array.from(Array(props.countOfLetter)).map((item: any, idx: number) => {
                        return <td key={index.toString() + idx.toString()}>{props.word[idx]}</td>
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    );
}