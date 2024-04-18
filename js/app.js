/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    //76 winning combos, 10 per each level, 16 vertical only, 12 corner diagonal, and 8 "flat" middle rows 
    // level-one flat combos
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
    // level-two flat combos
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [16, 20, 24, 28],
    [17, 21, 25, 29],
    [18, 22, 26, 30],
    [19, 23, 27, 31],
    [16, 21, 26, 31],
    [19, 22, 25, 28],
    // level-three flat combos
    [32, 33, 34, 35],
    [36, 37, 38, 39],
    [40, 41, 42, 43],
    [44, 45, 46, 47],
    [32, 36, 40, 44],
    [33, 37, 41, 45],
    [34, 38, 42, 46],
    [35, 39, 43, 47],
    [32, 37, 42, 47],
    [35, 38, 41, 44],
    //level-four flat combos
    [48, 49, 50, 51],
    [52, 53, 54, 55],
    [56, 57, 58, 59],
    [60, 61, 62, 63],
    [48, 52, 56, 60],
    [49, 53, 57, 61],
    [50, 54, 58, 62],
    [51, 55, 59, 63],
    [48, 53, 58, 63],
    [51, 54, 57, 60],
    //vertical non-diagonal combos
    [0, 16, 32, 48],
    [1, 17, 33, 49],
    [2, 18, 34, 50],
    [3, 19, 35, 51],
    [4, 20, 36, 52],
    [5, 21, 37, 53],
    [6, 22, 38, 54],
    [7, 23, 39, 55],
    [8, 24, 40, 56],
    [9, 25, 41, 57],
    [10, 26, 42, 58],
    [11, 27, 43, 59],
    [12, 28, 44, 60],
    [13, 29, 45, 61],
    [14, 30, 46, 62],
    [15, 31, 47, 63],
    //vertical corner diagonals
    [0, 17, 34, 51],
    [0, 20, 40, 60],
    [0, 21, 42, 63],
    [3, 18, 33, 48],
    [3, 23, 43, 63],
    [3, 22, 41, 60],
    [12, 24, 36, 48],
    [12, 29, 46, 63],
    [12, 25, 38, 51],
    [15, 27, 39, 51],
    [15, 30, 45, 60],
    [15, 26, 37, 48],
    //vertical middle row diagonals
    //horiztonal
    [4, 21, 38, 55],
    [8, 25, 42, 59],
    [7, 22, 37, 52],
    [11, 26, 41, 56],
    //vertical
    [1, 21, 41, 61],
    [2, 22, 42, 62],
    [13, 25, 37, 49],
    [14, 26, 38, 50],
]

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie


/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('.board')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const squareEls = document.querySelectorAll('.sqr')
const playBtnEl = document.querySelector('.close-modal')
const openModalEl = document.querySelector('#open-modal')
const endModalEl = document.querySelector('#end-modal')


/*-------------------------------- Functions --------------------------------*/

function init() {
    board = [
    '','','','','','','','','','','','','','','','',
    '','','','','','','','','','','','','','','','',
    '','','','','','','','','','','','','','','','',
    '','','','','','','','','','','','','','','','',]
    turn = "X"
    winner = false
    tie = false
    render()
}

function updateBoard() {
    board.forEach((sqr,idx) => {
        squareEls[idx].innerText = board[idx]
    })
}

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.innerText = (`It's Player ${turn}'s turn.`)
    } else if (winner === false && tie === true) {
        messageEl.innerText = ("It's a tie!")
    } else {
        messageEl.innerText = (`${turn} is the winner!`)
    }
}

function render() {
    updateBoard()
    updateMessage()
}

function handleClick(event) {
    // if (event.target.class != "sqr") return
    if (board[event.target.id] != '') return
    if (winner === true) return
    placePiece(event.target.id)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function placePiece(index) {
    board[index] = turn
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        if ((board[combo[0]] !== '') && 
        (board[combo[1]] === board[combo[0]]) &&
        (board[combo[2]] === board[combo[1]]) &&
        (board[combo[3]] === board[combo[2]])) {
            winner = true
            endModalEl.style.display = "flex";
        }
    })
}

function checkForTie() {
    if (winner === true) return
    if (!(board.some(sqr => (sqr === '')))) {
        tie = true
    }
}

function switchPlayerTurn() {
    if (winner === true) return
    if (turn === "X") {
        turn = "0"
    } else {
            turn = "X"
        }
}

function playGame() {
    openModalEl.style.display = "none"
    endModalEl.style.display = "none"
    init()
}

function resetModal() {
    openModalEl.style.display = "flex"
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', resetModal)
playBtnEl.addEventListener('click', playGame)


/*----------------------------- Runtime -----------------------------*/
