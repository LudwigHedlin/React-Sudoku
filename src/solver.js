
function sudokuSolver(board){
    const emptySquare=getEmptySquare(board);
    if(!emptySquare){
        return true; 
    }
    const [i,j]=emptySquare;
    const candidates=getAllowedNumbers(i,j);
    for(let number of candidates){
        board[i][j]=number;
        sudokuSolver(board);
        board[i][j]=0;
    }
    return false;
}

function getEmptySquare(board){
    
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(!board[i][j]){
                return [i,j];
            }
        }
    }
    return null; //no empty squares
}

function getAllowedNumbers(i,j,board){
    var allowedNumbers=new Set();
    for(let k=1;k<=9;k++){
        allowedNumbers.add(k);
    }
    for(let k=1;k<9;k++){
        allowedNumbers.delete(board[(i+k)%9][j]);
        allowedNumbers.delete(board[i][(j+k)%9]);      
    }
    let cornerI=(i/3|0)*3;
    let cornerJ=(j/3|0)*3;
    for(let k=0;k<3;k++){
        for(let l=0;l<3;l++){
            allowedNumbers.delete(board[cornerI+k][cornerJ+l]);
        }
    }
    return allowedNumbers;

}