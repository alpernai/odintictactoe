const gameBoard = () => {
    let board = Array(9).fill("");

    const resetBoard = () => {
        board = Array(9).fill(""); 
    };

    const getBoard = () => board;

    const setMark = (mark, index) => {
        if (board[index] !== "" || index < 0 || index >= board.length) {
            console.log('Invalid move!');
            return;
        }
        board[index] = mark;
    };

    return {
        resetBoard,
        getBoard,
        setMark,
    };
};

const createPlayer = (mark) => {
    return { mark, score: 0 };
};

const manageGame = (gameBoard) => {
    let gameOver = false;
    let currentPlayer;
    let playerX;
    let playerO;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const resetGame = () => {
        gameBoard.resetBoard();
        playerX = createPlayer('X');
        playerO = createPlayer('O');
        currentPlayer = playerX;  
        gameOver = false;  
    };

    const checkWin = () => {
        const boardState = gameBoard.getBoard();
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                boardState[a] !== "" &&
                boardState[a] === boardState[b] &&
                boardState[b] === boardState[c]
            ) {
                console.log(`${currentPlayer.mark} wins!`);
                gameOver = true;
                increaseScore(currentPlayer);
                return true;
            }
        }
        return false;
    };

    const changeTurn = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        console.log(`It's now ${currentPlayer.mark}'s turn.`);
    };

    const increaseScore = (player) => {
        player.score++;
    };

    return {
        resetGame,
        checkWin,
        changeTurn,
        increaseScore,
    };
};

const manageDOM = () => {
    const manageDOM = () => {
        const settingsButton = document.getElementById('settings-btn'); 
        const displayMessage = document.getElementById('display-message'); 
        const gameBoard = document.getElementById('game-board');
        const cells = document.querySelectorAll('.cell');
        const xScore = document.getElementById('x-score'); 
        const oScore = document.getElementById('o-score'); 
        const ties = document.getElementById('ties');
        const resetButton = document.getElementById('reset-button'); 
        const quitButton = document.getElementById('quit-button'); 
    
        return {
            settingsButton,
            displayMessage,
            gameBoard,
            cells,
            xScore,
            oScore,
            ties,
            resetButton,
            quitButton,
        };
    };    
};

const board = gameBoard();
const game = manageGame(board);


game.resetGame();
