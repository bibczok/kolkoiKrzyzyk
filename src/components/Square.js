import React from 'react'

export default function Square(props) {
    return (
        <button id="gameboard"
            className={props.winner?'square gold':'square'} /*pokolorowanie wygranych pól*/
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
