/* eslint-disable max-classes-per-file */
import React from 'react';

// rendered conditionally in Question component
const OnePlayerButton = (props) => {
  return <button onClick={props.on1Click}>1 player</button>;
};

// rendered conditionally in Question component
const TwoPlayerButton = (props) => {
  return <button onClick={props.on2Click}>2 players</button>;  
};

// rendered conditionally in Question component
const PlayXButton = (props) => {
  return <button className='xobtn' onClick={props.onXClick}>X</button>;    
}

// rendered conditionally in Question component
const PlayOButton = (props) => {
  return <button className='xobtn' onClick={props.onOClick}>O</button>;   
}

// rendered in Question component
const GameTypeQuestion = (props) => {
  return <h2>How &#160;&#160;&#160;would<br/> you like&#160; to play?</h2>; 
};

// rendered in Question component, add. blank spaces and <br> for styling
const SymbolQuestion = (props) => {
  const onePlayerOnly = props.onePlayerOnly;
  if (onePlayerOnly) {
    return (
      <h2>Would &#160;&#160;&#160;you <br/>  
        like to &#160;&#160;&#160;be X <br/>
        or &#160;O?</h2>
    );
  }
  return (
    <h2>Player 1 &#160;&#160;, would <br/>
      you like &#160;&#160;&#160;to be X<br/>
      or &#160;&#160;O?</h2>
  ); 
};

// rendered in Game component
const Question = (props) => {
  const gameTypeChosen = props.gameTypeChosen;
  const symbolChosen = props.symbolChosen;

  // Don't render Question if both questions are answered
  if (symbolChosen) {
    return null;
  }
  if (gameTypeChosen) {
    return (
      <div className='closed-shutters'>
        <SymbolQuestion onePlayerOnly={props.onePlayerOnly} />
        <PlayXButton onXClick={() => props.onXClick()} />
        <PlayOButton onOClick={() => props.onOClick()} />
      </div>
    ); 
  }
  return (
      <div className='closed-shutters'>
        <GameTypeQuestion />
        <OnePlayerButton on1Click={() => props.on1Click()} />
        <TwoPlayerButton on2Click={() => props.on2Click()} />
      </div>
    );
};

// rendered in Game component
const ResetButton = (props) => {
  const gameTypeChosen = props.gameTypeChosen;
  const symbolChosen = props.symbolChosen;
  // Don't render reset button in start mode
  if (!gameTypeChosen && !symbolChosen) {
    return null;
  } else {
    return <button id='reset' onClick={props.onClick}>Back to Start</button>;
  }
};

// rendered in Board component
const Square = (props) => {
  return (
    <td className='square'
        onMouseDown={props.onMouseDown}>
      {props.value}
    </td>
  );
};

// rendered in Game component
class Board extends React.Component {
  outputSquare(i) {
    return <Square value={this.props.squares[i]}
                   onMouseDown={() => this.props.onMouseDown(i)} />
  }
  
  render() {
    const symbolChosen = this.props.symbolChosen;
    // only render Board when user/player 1 has chosen its symbol
    if (!symbolChosen) {
      return null;
    }
    return (
      <div className='board-wrapper'>
        <div className='open-shutters left'></div>
        <table className='board'>
          <tr className='row'>
            {this.outputSquare(0)}
            {this.outputSquare(1)}
            {this.outputSquare(2)}
          </tr>
          <tr className='row'>
            {this.outputSquare(3)}
            {this.outputSquare(4)}
            {this.outputSquare(5)}
          </tr>
          <tr className='row'>
            {this.outputSquare(6)}
            {this.outputSquare(7)}
            {this.outputSquare(8)}
          </tr>
        </table>
        <div className='open-shutters right'></div>
      </div>
    );
  }
}

class Game extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: null,
      aiIsNext: null,
      onePlayerOnly: null,
      gameTypeChosen: null,
      symbolChosen: null
    };
  }
  
  handleOnePlayerClick() {
    this.setState({
      onePlayerOnly: true,
      gameTypeChosen: true
    });
  }
  
  handleTwoPlayerClick() {
    this.setState({
      onePlayerOnly: false,
      gameTypeChosen: true
    });
  }
  
  handlePlayXClick() {
    this.setState({
      xIsNext: true,
      symbolChosen: true
    });
  }

  handlePlayOClick() {
    this.setState({
      xIsNext: false,
      symbolChosen: true
    });
  }

  // AI move
  makeAiMove() {
    const squares = this.state.squares.slice();
    // Don't do anything if user's turn
    if (!this.state.aiIsNext) {
      return;
    }

    const makeMoveIn = (s) => {
      squares[s] = this.state.xIsNext ? 'X' : 'O';
    };
    // Checking if either X or O can win
    const possToWin = (p) => {
      let values = squares.slice();
      // used for storing blank squares in rows with 2 equal symbols
      let blank = [];
      // all possible rows (horizontal, vertical, diagonal)
      const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      // give each symbol and blank space a value
      for (let x = 0; x < values.length; x++) {
        if (values[x] === 'X') {
          values[x] = 3;
        } else if (values[x] === 'O') {
          values[x] = 5;
        } else {
          values[x] = 2;
        }
      }

      for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i];
        // if product of row values is 18 or 50, it's a possible win
        const product = values[a] * values[b] * values[c];
        if (p === 'X' && product === 18) {
          // store index no. where lowest value (i.e. 2) is
          if (values[a] < values[b]) blank.push(rows[i][0]);
          if (values[b] < values[c]) blank.push(rows[i][1]);
          if (values[c] < values[b]) blank.push(rows[i][2]);
        }
        else if (p === 'O' && product === 50) {
          if (values[a] < values[b]) blank.push(rows[i][0]);
          if (values[b] < values[c]) blank.push(rows[i][1]);
          if (values[c] < values[b]) blank.push(rows[i][2]);
        }
      }
      // return index no. of first blank square
      return blank[0];
    };

    const thirdOption = () => {
      // if centre is blank, place there
      if (!squares[4]) {
        return 4;
      }
      for (let i = 0; i < squares.length; i++) {
        // if corners are blank, place in any corner
        if (i % 2 === 0 && !squares[i]) {
          return i;
        }
        // otherwise place anywhere blank
        else if (squares[0] && squares[2] && squares[6] && squares[8] && !squares[i]) {
          return i;
        }
      }
    };
    // rules for making a move
    if (this.state.xIsNext && possToWin('O')) {
      makeMoveIn(possToWin('O'));
    }
    else if (this.state.xIsNext && possToWin('X')) {
      makeMoveIn(possToWin('X'));
    }
    else if (!this.state.xIsNext && possToWin('X')) {
      makeMoveIn(possToWin('X'));
    }
    else if (!this.state.xIsNext && possToWin('O')) {
      makeMoveIn(possToWin('O'));
    }
    else {
      makeMoveIn(thirdOption());
    }
    
    setTimeout(() => {
       this.setState({
        squares: squares,
        xIsNext: this.state.xIsNext ? false : true,
        aiIsNext: this.state.aiIsNext ? false : true
      });
    }, 2000);
    console.log(this.state.squares);
  }
  
  // user move in 1player game / moves for 2player game
  handleMouseDown(i) {
    const squares = this.state.squares.slice();
    if (!squares[i] && !this.isWinner(squares)) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
    }
    if (!this.state.onePlayerOnly) {
       this.setState({
         squares: squares,
         xIsNext: this.state.xIsNext ? false : true
       });
    } else {
        this.setState({
          squares: squares,
          xIsNext: this.state.xIsNext ? false : true,
          aiIsNext: this.state.aiIsNext ? false : true
        });
    }
  }
  // reset button handler
  handleResetClick() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: null,
      aiIsNext: null,
      onePlayerOnly: null,
      gameTypeChosen: null,
      symbolChosen: null
    });
  }
  // winner method returns winning symbol if any winner
  isWinner(squares) {
    const rows = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ]; 
    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      } 
    }
    return null;
  };
  // returns a blank board for a new round
  gameOver() {
      setTimeout(() => {
        this.setState({
          squares: Array(9).fill(null)
        });
      }, 2000);
  }

  render() {
    const gameTypeChosen = this.state.gameTypeChosen;
    const symbolChosen = this.state.symbolChosen;
    const xIsNext = this.state.xIsNext;
    const aiIsNext = this.state.aiIsNext;
    const squares = this.state.squares;
    const isWinner = this.isWinner(squares);
    let status = null;
   
    // when both questions answered, Board is rendered with status text
    // and the AI makes a move if not user's turn (condition in function
    //  above) or it's game over
    if (gameTypeChosen && symbolChosen) {
      if (xIsNext && !isWinner && squares.indexOf(null) >= 0) {
        status = `Next player is: X`;
        this.makeAiMove();
      }
      if (!xIsNext && !isWinner && squares.indexOf(null) >= 0) {
        status = `Next player is: O`;
        this.makeAiMove();
      }
      if (isWinner) {
        status = `We have a winner! Congrats to player ${isWinner}.`;
        this.gameOver();
      }
      if (squares.indexOf(null) === -1 && !isWinner) {
        status = `It was a draw...nice try though.`;
        this.gameOver();
      }
    }
    
    return (
      <div className='game'>
        <Question gameTypeChosen={this.state.gameTypeChosen} 
                  symbolChosen={this.state.symbolChosen}
                  onePlayerOnly={this.state.onePlayerOnly}
                  onXClick={() => this.handlePlayXClick()}
                  onOClick={() => this.handlePlayOClick()}
                  on1Click={() => this.handleOnePlayerClick()}
                  on2Click={() => this.handleTwoPlayerClick()} />
        <Board squares={this.state.squares}
               symbolChosen={this.state.symbolChosen}
               onMouseDown={(i) => this.handleMouseDown(i)} />
        <div className='status'>{status}</div>
        <ResetButton onClick={() => this.handleResetClick()}
                     gameTypeChosen={this.state.gameTypeChosen} 
                     symbolChosen={this.state.symbolChosen} />
      </div>
    );
  }
}
