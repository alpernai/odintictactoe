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
    };

    return {resetBoard, getBoard, setMark};
})();


const createPlayer = (name, mark) => {
    return { name, mark, score: 0 };
};


const manageGame = (() => {
    let gameOver = false;
    let currentPlayer = playerX;
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
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        console.log(currentPlayer);
    };

    const increaseScore = (player) => {
        player.score++
    };

    return { checkWin, changeTurn, increaseScore };
})();

// Execution

const playerX = createPlayer('Player 1', 'X');
const playerO = createPlayer('Player 2', 'O');

let game = gameBoard;

game.setMark(playerX.mark, "0");
game.setMark(playerX.mark, "1");
game.setMark(playerX.mark, "2");
game.setMark(playerO.mark, "-1");
game.setMark(playerX.mark, "9");




