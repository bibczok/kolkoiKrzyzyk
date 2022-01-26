import React, { Component } from 'react';
import Board from './Board';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            reversedHistory: false,
            history: [
                { squares: Array(9).fill(null), 
                  position: null  } /*opisujemy poszczegolne komponenty
                   i nadajemy im stany*/
            ],
        };

    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        }); /*metoda ta aktualizuje wartosc stepNumber
        wraz z przebiegiem rozgrywki*/
    }
    
    reversedHistory() {
        this.setState({
            reversedHistory: !this.state.reversedHistory,
        }); /*funkcja obracania historii ruchów*/
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const position = getPosition(i);
        const winner = Winner(squares);
        if(winner || squares[i]){
            return;
        }/*dzięki handleClick mozemy przechowywać wszystkie ważne
        informacje w jednym miejscu*/
        
        squares[i] = this.state.xIsNext?'X':'O'
        this.setState({
            history: history.concat({
                squares,
                position,
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        }) /*program sprawdza czy teraz jest tura X czy O*/
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Winner(current.squares);
        const moves = history.map((step, move)=>{
             const desc = move? 'Cofnij do '+ move +' ruchu ' + `( ${history[move].position.join('')} )` :'Zacznij grac';
            const bold = move === this.state.stepNumber ?'bold':'';
            return (
                <li key={move}  className={bold}>
                    <button onClick={()=>{this.jumpTo(move)}}>
                        {desc}
                    </button>
                </li>
            )
        }); /*metoda render w tym przypadku odczytuje aktualny status gry
            oraz aktualizuje stepNumber o wykonane ruchy, zapisuje je
            nastepnie na mapie. jumpTo pozwala nam wrocic do wczesniejszych ruchow*/

        let movesView=this.state.reversedHistory?moves.reverse():moves;

         let status;
        if(winner){
            status = 'Wygrywa zawodnik ' + winner.name;
        }else if(this.state.stepNumber===9) {
            status = 'Remis';
        }else{
            status = 'Nastepny ruch zawodnika '+ (this.state.xIsNext?'X':'O');
        } /*okres warunkowy sprawdzający który decyduje o tym 
        czy gra jest kontynułowana dalej czy też jest zakończona*/


 return (
            <div className="game">
                <div className="gameBoard">
                    <Board onClick={(i)=>this.handleClick(i)}
                    squares={current.squares} 
                    winner = {winner} /> 
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={()=>this.reversedHistory()}>Odwróć historie ruchów</button> 
                    </div>
                    <ul>{moves}</ul>
                </div>
            </div>
        ) /*funkcja sprawdzająca czy przypadkiem po wykonanym ruchu
         nie nastąpiła wygrana któregośz graczy oraz przycisk do
         odwrócenia historii ruchów*/
    }
}

function Winner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] /*wszystkie możliwe wygrane kombinacje
                    które pozwolą nam na wyłonienie zwycięzcy*/
    ];

    for(let i=0; i<lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return { 
            name: squares[a],
            line: lines[i],
            };
        }
    }
    return null;
}

function getPosition(i) {
    const rowMap = [
        ['a',3], ['b',3], ['c',3],
        ['a',2], ['b',2], ['c',2],
        ['a',1], ['b',1], ['c',1],
    ]
    return rowMap[i]; /*zwrócenie "mapki" z koordami kazdego ruchu*/
}
