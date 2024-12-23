const gameBoard = (() => {
    let board = Array(9).fill("");

    const resetBoard = () => {
        board = Array(9).fill("");
    };

    const getBoard = () => {
        console.log(board)
    };

    const setMark = (mark, index) => {
        if (board[index] !== "" || index < 0 || index >= board.length){
            console.log('Invalid move!');
            return;
        }

        board[index] = mark;
        console.log(board);
    };

    return {resetBoard, getBoard, setMark};
})();

const createPlayer = (name, mark) => {
    return { name, mark, turn: false, score: 0 };
};

const manageGame = () => {
    let gameOver = false;
    let currentPlayer;
    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];    

    const checkWin = () => {
    };

    const changeTurn = () => {
    };

    const increaseScore = () => {
    };

    return { checkWin, changeTurn, increaseScore };
};


const playerX = createPlayer('Player 1', 'X');
const playerO = createPlayer('Player 2', 'O');




let game = gameBoard;

game.setMark(playerX.mark, "0");
game.setMark(playerX.mark, "1");
game.setMark(playerX.mark, "2");
game.setMark(playerO.mark, "-1");
game.setMark(playerX.mark, "9");




