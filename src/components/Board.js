import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
    
     wonSquare(i) {
        if(this.props.winner&&this.props.winner.line.findIndex(el=>el===i)!==-1) {
            return true;
        } /*sprawdzanie wygranych pól*/
        return null;
    }
    
    renderSquare(i){
        return <Square value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        winner={this.wonSquare(i)}
        key={i}
        /> /*sprawdzanie który gracz zdobył wygrane pola*/
    }
    render() {
        return (
            <div className="board">
                <div className="row-counters">
                    <div className="row-num">1</div>
                    <div className="row-num">2</div>
                    <div className="row-num">3</div>
                </div>
                {
                    Array(3).fill(null).map((row,x)=> {
                        return (
                            <div className="board-row" key={x}>
                                {
                                    Array(3).fill(null).map((square,y)=>this.renderSquare(3*x+y))
                                }
                            </div>
                        )
                    })
                }
                <div className="column-counters">
                    <div className="column-num">a</div>
                    <div className="column-num">b</div>
                    <div className="column-num">c</div>
                </div>
            </div> /*przypisanie odpowiedniej litery do danej kolumny*/
        );
    }
}
