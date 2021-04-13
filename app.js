
const space0 = document.getElementById('0');
const space1 = document.getElementById('1');
const space2 = document.getElementById('2');
const space3 = document.getElementById('3');
const space4 = document.getElementById('4');
const space5 = document.getElementById('5');
const space6 = document.getElementById('6');
const space7 = document.getElementById('7');
const space8 = document.getElementById('8');
const text = document.getElementById('text');
const computerPlayAgainButton = document.getElementsByClassName('computer-new')[0];
const opponentPlayAgainButton = document.getElementsByClassName('opponent-new')[0];
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
    computerPlayAgainButton.innerText = 'Play Again 1 Player'
    opponentPlayAgainButton.innerText = 'Play Again 2 Players'
};


// Starts game against computer
computerPlayAgainButton.addEventListener('click', function(){
    inPlay = false
    computerGame = true
    playAgain()
})

//starts game against friend
opponentPlayAgainButton.addEventListener('click', function(){
    inPlay = false
    computerGame = false
    playAgain()
})

//resets the board and the game start state
function playAgain(){
    endGame(boardArr)
    gameStarted = true
    text.classList.remove('appear')
    setTimeout(function(){
        text.classList.remove('no-transition')
    }, 1000)
}


//Check for win (returns object with boolean & winning token if there was a win)
function checkForWin(arr){
    let returnValue = false
    for (let i = 0; i < winningArray.length; i++){
        let combo = winningArray[i];
        let index0 = combo[0];
        let index1 = combo[1];
        let index2 = combo[2];
        
        if(arr[index0] !== '' && 
           arr[index0] === arr[index1] && 
           arr[index1] === arr[index2]) {
            returnValue = { win: true, token: arr[index0]  }
        }
     }
     if (returnValue === false){
            returnValue = { win: false, token: null }
     }
     return returnValue
}

//Sets win the winning state for the game
function setWin(token) {
    winningToken = token
    toggleText(false)
}

//Check for draw & ends game if there is a draw
function checkForDraw(arr){
    if(turn === 9 && checkForWin(arr).win === false){
        toggleText(true)
        winningToken = true;
    } 
}

//restarts board
function endGame(arr){
    turn = 0;
    text.classList.add('no-transition')
    winningToken = false;
    computerPlayAgainButton.innerText = 'New Game 1 Player'
    opponentPlayAgainButton.innerText = 'New Game 2 Players'
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
    document.getElementById(`${index}`).appendChild(h2)
}

//Checks if space is on the board
function checkIfSpaceExsists(id){
    if ([0,1,2,3,4,5,6,7,8].includes(Number(id))){
        onBoard = true
    }
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

//Checks the board for a draw or win
function checkBoard(){
    winObject = checkForWin(boardArr)
    if (winObject.win === true){
        gameStarted = false
        setWin(winObject.token)
    }
    checkForDraw(boardArr)
}

//returns an array of the indexs that are empty
function emptyIndexs(){
    let indexArr = []
    let counter = 0
    boardArr.forEach((position) => {
        if(position === ''){
            indexArr.push(counter)
        }
        counter++
    })
    return indexArr
}

// Checks if opponent is close to a win
function checkIfClose(x){
    let emptyIndexArr = emptyIndexs()
    let fakeBoard = boardArr
    let returnValue = false
    emptyIndexArr.some((emptyIndex) => {
        fakeBoard[emptyIndex] = x
        if((checkForWin(fakeBoard).win === true) && (Math.floor(Math.random() * 15) !== 1)){
            returnValue = emptyIndex
        }
        fakeBoard[emptyIndex] = ''
    })
    return returnValue
}



//computer logic
function computerTurn(){
    let index;
    let opponentCheckResults = checkIfClose(thisGame)
    let computerCheckResults= checkIfClose(thisGame === 'x' ? 'o' : 'x')
    if (computerCheckResults !== false) {
        index = computerCheckResults
    } else if (opponentCheckResults !== false){
        index = opponentCheckResults
    } 
    else {
        index = emptyIndexs()[Math.floor ( Math.random() * emptyIndexs().length )]
    }
    gameStarted = false
    setTimeout(function(){
        placeLogic(index, 1)
        gameStarted = true
        checkBoard()
    }, 1000)
}

//updates the next game start token based on the dropdown
dropdown.addEventListener('change', function(e){
    nextGame = e.target.value
})

//Starts game when a space is clicked
board.addEventListener('click', function(e){

    //Checks whats the prefered token for whoever starts
    if (gameStarted === true) {
        if (inPlay === false) {
            thisGame = nextGame
            inPlay = true
        }

        //Gets Index of clicked space => checks if space exsists
        let index = Number(e.target.id)
        checkIfSpaceExsists(e.target.id)

    // For game w/ friend: places token => increases the turn count => checks board
    if (boardArr[index] === '' && winningToken === false && computerGame === false) {
        placeLogic(index, 0)
        turn++  
        checkBoard()
    }

    //For computer game: places token => increases turn count => checks board => Computer turn => increases turn count
    else if(boardArr[index] === '' && winningToken === false && computerGame === true) {
        placeLogic(index, 0)
        turn++
        checkBoard()
        if (gameStarted === true) {
            turn++
            computerTurn()
        }
    }

    //Alerts player that position is taken
        else if(onBoard === true && winningToken === false){
        text.innerText = 'Position Taken';
        text.classList.add('appear');
        setTimeout(function(){
            text.classList.remove('appear')
    }, 1500)

    }
} 
})