const gameBoard = (changeTurn, checkWin, checkTie, isGameOver) => {
    let board = Array(9).fill(""); 

    const getBoard = () => board;  

    const resetBoard = () => {
        board = Array(9).fill("");
        console.log(getBoard());
    };

    const setMark = (index, mark) => {
        if (board[index] !== "") {
            console.log("Invalid move. Cell marked")
        }

        if (game.isGameOver()) {
            console.log("Cannot place mark after game is over")
            return;
        }

        if (board[index] === "" && !game.isGameOver()) {  
            board[index] = mark;  
            changeTurn();         
            checkWin();           
            checkTie();          
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

    const getPlayerScore = (player) => player.score; 

    const isGameOver = () => gameOver;

    const checkWin = () => {
        const board = myGameBoard.getBoard();
        winningCombinations.forEach((combination) => {
            const [a, b, c] = combination;
            if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
                gameOver = true;
                roundsPlayed++;
                winner = board[a] === 'O' ? playerX : playerO;
                increasePlayerScore(winner);
                console.log(`Player ${winner.mark} wins!`);
                console.log(`Player X score: ${playerX.score}`);
                console.log(`Player O score: ${playerO.score}`);
                console.log(`Ties: ${ties}`);
                console.log(`Rounds played: ${roundsPlayed}`);
                return;
            }
        });
    };

    const checkTie = () => {
        const board = myGameBoard.getBoard();
        if (board.every(cell => cell !== "") && !gameOver) {
            gameOver = true;
            ties++;
            roundsPlayed++;
            console.log("It's a tie!");
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

    const resetRound = () => { 
        gameOver = false;
        winner = "TBD";
        myGameBoard.resetBoard();
        currentPlayer = playerX;
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
        getPlayerScore,
        isGameOver,
        resetRound,
        checkWin,
        checkTie,
        changeTurn,
        increasePlayerScore,
        quitGame, 
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

const manageDOM = (theGameBoard, manageTheGame) => {    
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

    const displayScores = () => {
        const xScore = document.getElementById('x-score');
        const oScore = document.getElementById('o-score');
        const ties = document.getElementById('ties');

        xScore.textContent = `Player X: ${game.getPlayerScore(game.playerX)}`;
        oScore.textContent = `Player O: ${game.getPlayerScore(game.playerO)}`;
        ties.textContent = `Ties: ${game.getPlayerScore(game.ties)}`;

    };
    
    return {generateBoard,
            handleCellClick,
            displayScores,
    };
};


const myGameBoard = gameBoard(
    (index) => game.changeTurn(), 
    () => game.checkWin(), 
    () => game.checkTie(),
    () => game.isGameOver()
);

const game = manageGame(myGameBoard);
const controlDOM = manageDOM(myGameBoard, game);
controlDOM.generateBoard();
controlDOM.handleCellClick();
controlDOM.displayScores();

