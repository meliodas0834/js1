
let randomNum = parseInt(Math.random() *100 +1);

const submit = document.querySelector('#subt');
const input = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remain = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const guess = parseInt(input.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess (guess) {
    if(isNaN(guess)) {
        alert('Please enter a valid number.');
    }
    else if(guess<1) {
        alert('Please enter a number more than 1');
    }
    else if(guess>100) {
        alert('Please enter a number less than 100');
    }
    else {
        prevGuess.push(guess);
        if(numGuess===10) {
            displayGuess(guess);
            displayMessage(`Game Over.Random Number was ${randomNum}`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess===randomNum) {
        displayMessage(`You Guessed it Right.`);
        endGame();
    }
    else if(guess<randomNum) {
        displayMessage(`Number is TOOO Low`);
    }
    else if(guess>randomNum) {
        displayMessage(`Number is TOOO High`);
    }
}

function displayGuess(guess) {
    input.value='';
    guessSlot.innerHTML +=`${guess} `;
    numGuess++;
    remain.innerHTML = `${11-numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    input.value='';
    input.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newgame">Start New Game</h2>`
    startOver.appendChild(p);
    playGame=false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newgame');
    newGameButton.addEventListener('click', function() {
        randomNum = parseInt(Math.random() *100 +1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remain.innerHTML = `${11-numGuess}`;
        input.removeAttribute('disabled');
        startOver.removeChild(p);

        playGame = true;
    });
}