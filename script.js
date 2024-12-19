const gameBoard = () => {
    let board = [];

    const createBoard = () => {
        board = Array(9).fill("");
    };

    const getBoard = () => board;
    const placeMark = () => {
    };

    return { createBoard, getBoard, placeMark };
}

const gameFlow = () => {
    let gameOver = false;
    let currentPlayer = "";

    const startGame = () => {
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkWinner = () => {
    };

    const switchTurn = () => {
    };

    const resetGame = () => {
    };

    return { startGame, getCurrentPlayer, checkWinner, switchTurn, resetGame };
}

const players = () => {
    const createPlayer = () => {
    };

    const getPlayerMark = () => {
    };

    return { createPlayer, getPlayerMark}
}

const manageDOM = () => {

    const displayTurn = () => {
    };

    const displayScore = () => {
    };

    const displayWinner = () => {
    };

    return { displayTurn, displayScore, displayWinner }
}

