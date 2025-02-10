//------------------------------Game Board---------------------------------------------

const gameBoard = (changeTurn, checkWin, checkTie, isGameOver) => {
    let updateDOM = null;
    let board = Array(9).fill("");              

    const getBoard = () => board;  

    const resetBoard = () => {
        board = Array(9).fill("");
    };

    const setMark = (index, mark) => {
        if (board[index] === "" && !isGameOver()) { // Check cell is empty and game isn't over  
            board[index] = mark;  
            changeTurn();         
            checkWin();           
            checkTie();    
            if (updateDOM) {
                updateDOM.displayMessage();
                updateDOM.displayScores();
            }  
        }
    };

    const setUpdateDOM = (dom) => {
        updateDOM = dom;
    };
    
    return {
        resetBoard,
        getBoard,
        setMark,
        setUpdateDOM
    };
};

//------------------------------Players----------------------------------------------

const createPlayer = (mark) => {
    return { mark, score: 0 };
};

//----------------------------Manage Game------------------------------------------------

const manageGame = (myGameBoard) => {
    let gameOver = false;
    let isTie = false;
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

    const getPlayerScore = (player) => player.score; 

    const getRoundsPlayed = () => roundsPlayed; 

    const getTies = () => ties; 

    const isGameOver = () => gameOver;

    const getIsTie = () => isTie;

    const getWinner = () => winner;

    const checkWin = () => {
        const board = myGameBoard.getBoard();
        winningCombinations.forEach((combination) => {
            const [a, b, c] = combination;
            if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
                gameOver = true;
                roundsPlayed++;
                winner = board[a] === 'O' ? playerX : playerO;
                increasePlayerScore(winner);
                console.log("Round over. Press reset to keep playing")
                return;
            }
        });
    };

    const checkTie = () => {
        const board = myGameBoard.getBoard();
        if (board.every(cell => cell !== "") && !gameOver) {
            gameOver = true;
            isTie = true;
            winner = "nobody"
            ties++;
            roundsPlayed++;
            console.log("Round over. Press reset to keep playing")
            return;
        }
    };

    const changeTurn = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        console.log(`It is now ${currentPlayer.mark}'s turn`);
    };

    const increasePlayerScore = (player) => {
        player.score++;
    };

    const resetGame = () => { 
        gameOver = false;
        isTie = false;
        winner = "";
        myGameBoard.resetBoard();
        currentPlayer = playerX;
    };

    const quitGame = () => {
        gameOver = false;
        isTie = false;
        roundsPlayed = 0;
        ties = 0;
        playerX.score = 0;
        playerO.score = 0;
        winner = "";
        myGameBoard.resetBoard();
        currentPlayer = playerX;

        console.log(`Is game over? ${isGameOver()}`);
        console.log(`Winner: ${getWinner()}`);
        console.log(`Current player: ${getCurrentPlayer().mark}`)
        console.log(`Player X score: ${playerX.score}`);
        console.log(`Player O score: ${playerO.score}`);
        console.log(`Ties: ${ties}`);
        console.log(`Rounds played: ${roundsPlayed}`);
    }

    return {
        getCurrentPlayer,
        getPlayerScore,
        getRoundsPlayed,
        getTies,
        isGameOver,
        getWinner,
        resetGame,
        checkWin,
        checkTie,
        changeTurn,
        increasePlayerScore,
        quitGame, 
        getIsTie,
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

//------------------------------Manage DOM----------------------------------------------

const manageDOM = (myGameBoard, game) => {    
    const generateBoard = () => {
        for (let i = 0; i < 9; i++) {
            const gameBoardElement = document.getElementById('game-board')
            const cell = document.createElement('div');            
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            gameBoardElement.appendChild(cell);
        }
    };

    const handleCellClick = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                if (game.isGameOver() || myGameBoard.getBoard()[index] !== "") {
                    return; 
                }
                myGameBoard.setMark(index, game.getCurrentPlayer().mark);
                event.target.textContent = game.getCurrentPlayer().mark;
            
            });
        });
    };

    const displayMessage = () => {
        let displayMessageElement = document.getElementById('display-message');
        
        if (game.getIsTie()) {
            displayMessageElement.textContent = `It's a tie!`
        }

        if (game.isGameOver() && !game.getIsTie()) {
            displayMessageElement.textContent = `Player ${game.getCurrentPlayer().mark} wins!`
        }
        
        if (!game.isGameOver()) {
            displayMessageElement.textContent = `Player ${game.getCurrentPlayer().mark}'s turn`
        }
    }

    const displayScores = () => {
        const xScore = document.getElementById('x-score');
        const oScore = document.getElementById('o-score');
        const ties = document.getElementById('ties');
        const rounds = document.getElementById('rounds');

        xScore.textContent = `Player X: ${game.getPlayerScore(game.playerX)}`;
        oScore.textContent = `Player O: ${game.getPlayerScore(game.playerO)}`;
        ties.textContent = `Ties: ${game.getTies()}`;
        rounds.textContent = `Rounds: ${game.getRoundsPlayed()}`;
    };

    const runResetGame = () => {
        const resetButton = document.getElementById('reset-button');
        const gameBoardElement = document.getElementById('game-board');
        resetButton.addEventListener('click', (event) => {
            game.resetGame();
            gameBoardElement.textContent = "";
            generateBoard();
            handleCellClick();
        })
    };

    const runQuitGame = () => {
        const quitButton = document.getElementById('quit-button');
        const gameBoardElement = document.getElementById('game-board');
        quitButton.addEventListener('click', (event) => {
            game.quitGame();
            gameBoardElement.textContent = "";
            generateBoard();
            handleCellClick();
            displayMessage();
            displayScores();
        })
    };
    
    return {generateBoard,
            handleCellClick,
            displayMessage,
            displayScores,
            runResetGame,
            runQuitGame
    };
};

//--------------------------------Execution--------------------------------------------

const myGameBoard = gameBoard(
    (index) => game.changeTurn(), 
    () => game.checkWin(), 
    () => game.checkTie(),
    () => game.isGameOver()
);
const game = manageGame(myGameBoard);
const controlDOM = manageDOM(myGameBoard, game);
myGameBoard.setUpdateDOM(controlDOM);
controlDOM.generateBoard();
controlDOM.handleCellClick();
controlDOM.displayMessage();
controlDOM.displayScores();
controlDOM.runResetGame();
controlDOM.runQuitGame();


