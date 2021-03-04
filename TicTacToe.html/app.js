const space0 = document.getElementById('space0')
const space1 = document.getElementById('space1')
const space2 = document.getElementById('space2')
const space3 = document.getElementById('space3')
const space4 = document.getElementById('space4')
const space5 = document.getElementById('space5')
const space6 = document.getElementById('space6')
const space7 = document.getElementById('space7')
const space8 = document.getElementById('space8')
const board = document.getElementsByClassName('board')[0]
const startButton = document.getElementsByClassName('start-btn')[0]
let boardArr = ['','','','','','','','','']
let turn = 0
const winningArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ]


//Start Game Button
startButton.addEventListener('click', function(){
    console.log('click');
    startButton.classList.add('disapear');
    setInterval(function(){
        board.classList.add('show-board');
    }, 1000)   
})

//Functions

//Check for win function
function checkForWin(arr){
    winningArray.some(combo => {
        if (combo[0] === '') {
            return false
        } else if(combo[0] === combo[1] && combo[1] === combo[2]) {
            return true
        } else {
            return false
        }
    })
}

//Check for draw function
function checkForDraw(arr){
    if(turn === 9 && checkForWin(arr) === false){
        return true
    } else {
        return false
    }
}

//restarts board
function endGame(arr){
    for(let i = 0; i < arr.length; i++ ){
        if(!arr[i] === ''){
            arr[i] = '';
            let index = `space${i}`;
            let h2 = index.children[0];
            index.removeChild(h2)
        }
    }
    turn = 0;

}

//Plays Turn
board.addEventListener('click', function(e){
    //Gets Index of space
    let index;
    if(e.target.id === 'space0'){
        index = 0;
    } else if(e.target.id === 'space1') {
        index = 1;
    } else if(e.target.id === 'space2') {
        index = 2;
    } else if(e.target.id === 'space3') {
        index = 3;
    } else if(e.target.id === 'space4') {
        index = 4;
    } else if(e.target.id === 'space5') {
        index = 5;
    } else if(e.target.id === 'space6') {
        index = 6;
    } else if(e.target.id === 'space7') {
        index = 7;
    } else if(e.target.id === 'space8') {
        index = 8;
    }

    //Checks if positions taken, if not creates token and adds to array
    if (boardArr[index] === '') {
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

    } else {
        alert('Position taken')
    }

    if (!checkForWin(boardArr) === false) {
        alert(`${checkForWin(boardArr)} is the winner`)
    } else if (checkForDraw(boardArr) === true) {
        alert("Draw game")
        endGame(boardArr)
    }
})

    
