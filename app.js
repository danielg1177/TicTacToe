
const space0 = document.getElementById('space0');
const space1 = document.getElementById('space1');
const space2 = document.getElementById('space2');
const space3 = document.getElementById('space3');
const space4 = document.getElementById('space4');
const space5 = document.getElementById('space5');
const space6 = document.getElementById('space6');
const space7 = document.getElementById('space7');
const space8 = document.getElementById('space8');
const text = document.getElementById('text');
const computerPlayAgainButton = document.getElementsByClassName('computer-new-game')[0];
const opponentPlayAgainButton = document.getElementsByClassName('opponent-new-game')[0];
const board = document.getElementsByClassName('board')[0];
const opponentStartButton = document.getElementsByClassName('opponent-start-btn')[0];
const computerStartButton = document.getElementsByClassName('computer-start-btn')[0];
const dropdown = document.getElementById('filter');
let inPlay = false;
let nextGame = 'x';
let thisGame = 'x';
let firstTurn = true;
let boardArr = ['','','','','','','','',''];
let onBoard = false;
let gameStarted = false;
let computerGame = false;
let turn = 0;
let winningToken = false;
const winningArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];



//Start Game Button Opponent
opponentStartButton.addEventListener('click', function(){
    startGame()
    computerGame = false; 
})

//Start Game Button Computer
computerStartButton.addEventListener('click', function(){
    startGame()
    computerGame = true;   
})

//Starts Game
function startGame(){
    opponentStartButton.classList.add('disapear');
    computerStartButton.classList.add('disapear');
    gameStarted = true
    setTimeout(function(){
        board.classList.add('show-board');
        computerPlayAgainButton.classList.add('button-appear')
        opponentPlayAgainButton.classList.add('button-appear')
    }, 900)
}

//Game Status Text
function toggleText(option){
    text.classList.add('appear');
    if(option === true) {
        text.innerText = 'Draw Game';
    } else {
        text.innerText = `${winningToken.toUpperCase()} Wins!`;
    }
    gameStarted = false
    inPlay = false
    computerPlayAgainButton.innerText = 'Play Against Computer'
    opponentPlayAgainButton.innerText = 'Play Against Friend'
};


// Check Board
computerPlayAgainButton.addEventListener('click', function(){
    inPlay = false
    computerGame = true
    playAgain()
})

opponentPlayAgainButton.addEventListener('click', function(){
    inPlay = false
    computerGame = false
    playAgain()
})


function playAgain(){
    endGame(boardArr)
    gameStarted = true
    text.classList.remove('appear')
    setTimeout(function(){
        text.classList.remove('no-transition')
    }, 1000)
}


//Check for win
function checkForWin(arr){
    
    for (let i = 0; i < winningArray.length; i++){
        let combo = winningArray[i];
        let index0 = combo[0];
        let index1 = combo[1];
        let index2 = combo[2];
        
        if(arr[index0] !== '' && 
           arr[index0] === arr[index1] && 
           arr[index1] === arr[index2]) {
                winningToken = arr[index0]
                toggleText(false)
        }
    }
    if (winningToken === false){
            return false;
    }

}

//Check for draw function
function checkForDraw(arr){
    if(turn === 9 && checkForWin(arr) === false){
        toggleText(true)
        winningToken = true;
        return true
    } else {
        return false
    }
}

//restarts board
function endGame(arr){
    turn = 0;
    text.classList.add('no-transition')
    winningToken = false;
    computerPlayAgainButton.innerText = 'New Game VS Computer'
    opponentPlayAgainButton.innerText = 'New Game VS Friend'
    boardArr = ['','','','','','','','',''];
    space0.innerText = '';
    space1.innerText = '';
    space2.innerText = '';
    space3.innerText = '';
    space4.innerText = '';
    space5.innerText = '';
    space6.innerText = '';
    space7.innerText = '';
    space8.innerText = '';
    
}

//Places Token
function placeToken(index, token) {
    let h2 = document.createElement('h2');
    h2.classList.add('x')
    h2.innerText = token.toUpperCase()
    boardArr[index] = token
    document.getElementById(`space${index}`).appendChild(h2)
}

//logic for which token
function placeLogic(index, i){
    if(thisGame === 'x'){
        if(turn % 2 === i){
            placeToken(index, 'x')
        } else {
            placeToken(index, 'o')
        } 
    } else {
        if(turn % 2 === i) {
            placeToken(index, 'o')
        } else {
            placeToken(index, 'x')
        } 
    }
}

function checkBoard(){
    checkForWin(boardArr)
    checkForDraw(boardArr)
}

//computer logic
function computerTurn(){
    if (winningToken === false){
    index = Math.floor ( Math.random() * boardArr.length )
    option = boardArr[index]
        if (option === '') {
            setTimeout(function(){
                placeLogic(index, 1)
                checkBoard()
            }, 1000)
        } else {
            computerTurn()
        }
    }
}

//Dropdown options
dropdown.addEventListener('change', function(e){
    nextGame = e.target.value
})

//Plays Turn against opponent
board.addEventListener('click', function(e){
    //Gets Index of clicked space
    if (gameStarted === true) {
        if (inPlay === false) {
            thisGame = nextGame
            inPlay = true
        }
        let index;
        if(e.target.id === 'space0'){
            onBoard = true;
            index = 0;
        } else if(e.target.id === 'space1') {
            onBoard = true;
            index = 1;
        } else if(e.target.id === 'space2') {
            onBoard = true;
            index = 2;
        } else if(e.target.id === 'space3') {
            onBoard = true;
            index = 3;
        } else if(e.target.id === 'space4') {
            onBoard = true;
            index = 4;
        } else if(e.target.id === 'space5') {
            onBoard = true;
            index = 5;
        } else if(e.target.id === 'space6') {
            onBoard = true;
            index = 6;
        } else if(e.target.id === 'space7') {
            onBoard = true;
            index = 7;
        } else if(e.target.id === 'space8') {
            onBoard = true;
            index = 8;
        }

    //Checks if positions taken, if not creates token and adds to array
    if (boardArr[index] === '' && winningToken === false && computerGame === false) {
        placeLogic(index, 0)
        turn++  
        checkBoard()

    } else if(boardArr[index] === '' && winningToken === false && computerGame === true) {
        placeLogic(index, 0)
        turn++
        checkBoard()
        computerTurn()
        turn++
    }
        else if(onBoard === true && winningToken === false){
        text.innerText = 'Position Taken';
        text.classList.add('appear');
        setTimeout(function(){
            text.classList.remove('appear')
    }, 1500)

    }
} 
})

//Plays against computer

    
