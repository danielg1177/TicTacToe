
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
const playAgainButton = document.getElementsByClassName('button')[0];
const board = document.getElementsByClassName('board')[0];
const startButton = document.getElementsByClassName('start-btn')[0];
let boardArr = ['','','','','','','','',''];
let onBoard = false;
let gameStarted = false;
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



//Start Game Button
startButton.addEventListener('click', function(){
    startButton.classList.add('disapear');
    setTimeout(function(){
        board.classList.add('show-board');
        playAgainButton.classList.add('button-appear')
        gameStarted = true;
    }, 900)   
})

//Functions
function toggleText(option){
    if(option === true) {
        text.innerText = 'Draw Game';
        text.classList.add('appear');
        playAgainButton.innerText = 'Play Again'
    } else {
        text.innerText = `${winningToken.toUpperCase()} Wins!`;
        text.classList.add('appear');
        playAgainButton.innerText = 'Play Again'
    }

};


// Check Board
playAgainButton.addEventListener('click', function(){
    endGame()
    text.classList.remove('appear')
    setInterval(function(){
        text.classList.remove('no-transition')
    }, 1000)
})


//Check for win function
function checkForWin(arr){
    
    for (let i = 0; i < winningArray.length; i++){
        let combo = winningArray[i];
        let index0 = combo[0];
        let index1 = combo[1];
        let index2 = combo[2];
        console.log(boardArr)
        
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
    playAgainButton.innerText = "New Game"
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

function checkBoard(){
    checkForWin(boardArr)
    checkForDraw(boardArr)
}

//Plays Turn
board.addEventListener('click', function(e){
    //Gets Index of clicked space
    if (gameStarted === true) {
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
    if (boardArr[index] === '' && winningToken === false) {
        let h2 = document.createElement('h2');
        h2.classList.add('x')
        if(turn % 2 === 0){
            h2.innerText = 'X'
            boardArr[index] = 'x'
        } else {
            h2.innerText = 'O'
            boardArr[index] = 'o'
        }

        //appends token to spot and adds a turn
        e.target.appendChild(h2)
        turn++  
        checkBoard()

    } else if(onBoard === true && winningToken === false){
        text.innerText = 'Position Taken';
        text.classList.add('appear');
        setTimeout(function(){
            text.classList.remove('appear')
    }, 1500)
    }
    }
})

    
