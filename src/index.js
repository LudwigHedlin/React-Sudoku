import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';




function Square(props){
        return <button 
        className={props.btn} 
        onClick={props.onClick}>
            {props.value?props.value:""}
        </button>
}

class Sudoku extends React.Component{

    constructor(props){
        super(props);

        this.state={
            board: new Array(9),
            boardIndex:null,
        };
        for(let i=0;i<9;i++){
            this.state.board[i]=new Array(9).fill(0);
        }

        //this.elementRef=React.createRef();
    }

    componentDidMount(){
        window.addEventListener("keydown", (e)=> this.handleKeys(e.key));
    }

    handleClick(i,j){
        this.setState({boardIndex:[i,j]});
        
    }

    handleKeys(key){
        if(48>=key&&key<=57&& this.state.boardIndex){
            let  i=this.state.boardIndex[0];
            let j=this.state.boardIndex[1];
            this.setBoardAtIndex(i,j,key);
        }
    }

    copyBoard(board){
        let board2 =new Array(9);
        for (let i = 0; i < 9; i++) {
            board2[i] = board[i].slice();
        }
        return board2;
    }

    clearBoard(){
        let board=new Array(9);
        for(let i=0;i<9; i++){
            board[i]=new Array(9).fill(0);
        }
        this.setState({board: board});
    }

    solve(){
        var board=this.copyBoard(this.state.board);
        sudokuSolver(board);
        return board;
    }

    setBoardAtIndex(i,j,value){
        var board=this.copyBoard(this.state.board);
        board[i][j]=parseInt(value);
        console.log(board[i][j])
        this.setState({board: board});
    }
      
    renderSquare(i, j) {
        let classname="square";
        if (this.state.boardIndex&&i === this.state.boardIndex[0] && j === this.state.boardIndex[1]) classname+=" clicked";
        return <Square 
        btn={classname}
        value={this.state.board[i][j]} 
        onClick={()=>{
            this.handleClick(i,j);
            }}
            />
    }

    renderBlock(i,j) {
        return (
            <div className="block">
                {this.renderSquare(3 * i, 3 * j)}
                {this.renderSquare(3 * i + 1, 3*j)}
                {this.renderSquare(3 * i + 2, 3 * j)}

                {this.renderSquare(3 * i, 3 * j+1)}
                {this.renderSquare(3 * i + 1, 3 * j+ 1)}
                {this.renderSquare(3 * i + 2, 3 * j+ 1)}

                {this.renderSquare(3 * i, 3 * j+2)}
                {this.renderSquare(3 * i + 1, 3 * j+ 2)}
                {this.renderSquare(3 * i + 2, 3 * j+ 2)}
            </div>
        )
    }

    render(){
        return (
        <div className="sudoku">
            <div className="sudoku-board">
            
                {this.renderBlock(0, 0)}
                {this.renderBlock(1, 0)}
                {this.renderBlock(2, 0)}
            
                {this.renderBlock(0, 1)}
                {this.renderBlock(1, 1)}
                {this.renderBlock(2, 1)}

                {this.renderBlock(0, 2)}
                {this.renderBlock(1, 2)}
                {this.renderBlock(2, 2)}

            
            </div>
            <div className="game-buttons">
                <button className="solver" onClick={()=>{ 
                    var board=this.solve();
                    this.setState({board:board});
                    }}>Solve
                </button>
                <button className="clear" onClick={()=>(this.clearBoard())}>
                    Clear
                </button>
                <button className="check" >
                    Check
                </button>
            </div>
        </div>
        
        )
    }
}



ReactDOM.render(<Sudoku/>,document.getElementById("root"));

//Solver
function sudokuSolver(board) {
    const emptySquare = getEmptySquare(board);
    if (!emptySquare) {
        return true;
    }
    const [i, j] = emptySquare;
    const candidates = getAllowedNumbers(i, j, board);
    for (let number of candidates) {
        board[i][j] = number;
        if (sudokuSolver(board)) {
            return true;
        } else {
            board[i][j] = 0;
        }

    }
    return false;
}

function getEmptySquare(board) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!board[i][j]) {
                return [i, j];
            }
        }
    }
    return null; //no empty squares
}

function getAllowedNumbers(i, j, board) {
    var allowedNumbers = new Set();
    for (let k = 1; k <= 9; k++) {
        allowedNumbers.add(k);
    }
    for (let k = 1; k < 9; k++) {
        allowedNumbers.delete(board[(i + k) % 9][j]);
        allowedNumbers.delete(board[i][(j + k) % 9]);
    }
    let cornerI = (i / 3 | 0) * 3;
    let cornerJ = (j / 3 | 0) * 3;
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            allowedNumbers.delete(board[cornerI + k][cornerJ + l]);
        }
    }
    return allowedNumbers;

}
