const gameBoard = () => {
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
}

const createPlayers = () =>{
    const createPlayer = (mark) => {
        const player = mark;
        return player;
    };
}

let game = gameBoard();

game.setMark('O', "0");
game.setMark('O', "1");
game.setMark('O', "2");
game.setMark('X', "-1");
game.setMark('X', "9");




