import React from 'react';

class Usernames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOne: '',
            playerTwo: '',
        };
    this.playerOneChange = this.playerOneChange.bind(this);
    this.playerTwoChange = this.playerTwoChange.bind(this);
    }
playerOneChange(po) {
    this.setState({
        playerOne: po.target.value
    });
}
playerTwoChange(pt) {
    this.setState({
        playerTwo: pt.target.value
    });
}
render(){
    return (
        <div class="users">
            <label>Gracz 1:
                <input type="text" onChange={this.playerOneChange} />
            </label>
            <button type="button">Potwierdź</button>
            <label>Gracz 2:
                <input type="text" onChange={this.playerTwoChange} />
            </label>
            <button type="button">Potwierdź</button>
        </div>
    )
}
}