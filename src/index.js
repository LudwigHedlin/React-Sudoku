import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './solver';


function Square(props){
        return <button className="square" onClick={props.onClick}>{props.value}</button>
}

class Sudoku extends React.Component{

    constructor(props){
        super(props);

        this.boardIndex=null;
        this.state={
            board: new Array(9),
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
        console.log(i+j);
        this.boardIndex=[i,j];
    }

    copyBoard(){
        let board =new Array(9);
        for (let i = 0; i < 9; i++) {
            board[i] = this.state.board[i].slice();
        }
        return board;
    }

    solve(){
        var board=this.copyBoard();
        sudokuSolver(board);
        return board;
    }

    setBoardAtIndex(i,j,value){
        var board=this.copyBoard();
        board[i][j]=parseInt(value);
        console.log(board[i][j])
        this.setState({board: board});
    }

    handleKeys(key){
        if(48>=key&&key<=57&& this.boardIndex){
            let  i=this.boardIndex[0];
            let j=this.boardIndex[1];
            this.setBoardAtIndex(i,j,key);
        }
        this.boardIndex=null

    }
    
    
    renderSquare(i, j) {
        return <Square value={this.state.board[i][j]} 
        onClick={()=>this.handleClick(i,j)}
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
            <button className="solver" onClick={()=>{ 
                var board=this.solve();
                this.setState({board:board});
                }}>Solve</button>
        </div>
        
        )
    }
}

function sudokuSolver(board) {
    const emptySquare = getEmptySquare(board);
    if (!emptySquare) {
        return true;
    }
    const [i, j] = emptySquare;
    const candidates = getAllowedNumbers(i, j,board);
    for (let number of candidates) {
        board[i][j] = number;
        if(sudokuSolver(board)){
            return true;
        }else{
            board[i][j]=0;
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


ReactDOM.render(<Sudoku/>,document.getElementById("root"));