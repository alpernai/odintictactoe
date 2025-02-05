const gameBoard = (changeTurn, checkWin, checkTie) => {
    let board = Array(9).fill("");

    const getBoard = () => board;

    const resetBoard = () => {
        board = Array(9).fill("");
        console.log(getBoard());
    };

    const setMark = (index, mark) => {
        if (board[index] === "") {  
            board[index] = mark;  
            console.log(getBoard());
            changeTurn();         
            checkWin();           
            checkTie();          
        } else {
            console.log("Invalid move.");
        }
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

const manageGame = (myGameBoard) => {
    let gameOver = false;
    let winner = "";
    let roundsPlayed = 0;
    let ties = 0;
    let playerX = createPlayer('X');
    let playerO = createPlayer('O');
    let currentPlayer = playerX;
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

    const getCurrentPlayer = () => currentPlayer;

    const checkWin = () => {
        const board = myGameBoard.getBoard();
        winningCombinations.forEach((combination) => {
            const [a, b, c] = combination;
            if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
                gameOver = true;
                roundsPlayed++;
                winner = board[a] === 'X' ? playerX : playerO;
                increasePlayerScore(winner);
                console.log(`Player ${winner.mark} wins!`);
            }
        });
        console.log(`Is game over? ${gameOver}`);
    };

    const checkTie = () => {
        const board = myGameBoard.getBoard();
        if (board.every(cell => cell !== "") && !gameOver) {
            gameOver = true;
            ties++;
            roundsPlayed++;
            console.log("It's a tie!");
        }
        console.log(`Is game over? ${gameOver}`);
    };

    const changeTurn = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        console.log(`It is now ${currentPlayer.mark}'s turn`);
    };

    const increasePlayerScore = (player) => {
        player.score++;
    };

    const resetRound = () => { 
        gameOver = false;
        winner = "TBD";
        myGameBoard.resetBoard();
        currentPlayer = playerX;
        console.log(`Player X score: ${playerX.score}`);
        console.log(`Player O score: ${playerO.score}`);
        console.log(`Ties: ${ties}`);
        console.log(`Rounds played: ${roundsPlayed}`);
        console.log(`Is game over? ${gameOver}`);
        console.log(`Winner: ${winner}`);
        console.log(`Current player: ${currentPlayer.mark}`);
    };

    const quitGame = () => {
        gameOver = false;
        roundsPlayed = 0;
        ties = 0;
        playerX.score = 0;
        playerO.score = 0;
        winner = "TBD";
        myGameBoard.resetBoard();
        currentPlayer = playerX;
    }

    return {
        getCurrentPlayer,
        resetRound,
        checkWin,
        checkTie,
        changeTurn,
        increasePlayerScore,
        gameOver,
        winner, 
        roundsPlayed,
        ties,
        playerX,
        playerO,
        currentPlayer,  
        gameBoard: myGameBoard 
    };  
};

const myGameBoard = gameBoard(
    (index) => game.changeTurn(), 
    () => game.checkWin(), 
    () => game.checkTie()
);

const game = manageGame(myGameBoard);






// const manageDOM = (game, board) => {
//     const settingsButton = document.getElementById('settings-btn');
//     const displayMessage = document.getElementById('display-message');
//     const gameBoardElement = document.getElementById('game-board');
//     const cells = document.querySelectorAll('.cell');
//     const xScore = document.getElementById('x-score');
//     const oScore = document.getElementById('o-score');
//     const ties = document.getElementById('ties');
//     const resetButton = document.getElementById('reset-button');
//     const quitButton = document.getElementById('quit-button');
    
//     const updateDisplayMessage = () => {};

//     const handleCellClick = () => {};

//     const updateBoardDisplay = () => {};

//     const updateScores = () => {};

//     return {
//         updateScores,
//         updateBoardDisplay,
//     };
// };




