let wins = 0;
let losses = 0;
let gameOver = false;

const wordList =["SPACE", "ALIEN", "STARS", "ROCKET", "ASTEROID", "GALAXY", "PLANET"];
let hiddenWord = "";
let currentWordState = [];
let wrongGuesses = 0;

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    hiddenWord = wordList[randomIndex];
    currentWordState = new Array(hiddenWord.length).fill('_');
}

function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    
    currentWordState.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter === '_' ? '_ ' : letter + ' ';
        wordDisplay.appendChild(letterElement);
    });
}

function generateAlphabet() {
    const alphabetContainer = document.getElementById('alphabet');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-btn');
        button.setAttribute('data-letter', letter); 
        
        button.addEventListener('click', function() {
            handleLetterClick(button);
        });

        alphabetContainer.appendChild(button);
    });
}

function displayMessage(text) {
    document.getElementById('message').textContent = text;
}

function handleLetterClick(button) {
    if (gameOver) return;
    const guessedLetter = button.getAttribute('data-letter');
    
    button.classList.add('unlit');
    button.disabled = true;

    if (hiddenWord.includes(guessedLetter)) {
        hiddenWord.split('').forEach((letter, index) => {
            if (letter === guessedLetter) {
                currentWordState[index] = guessedLetter; 
            }
        });
    } else {
        wrongGuesses++; 
        moveSpaceman(); 
    }

    displayWord();

    if (!currentWordState.includes('_')) {
        wins++;
        updateScore();
        displayMessage('You Win!');
        gameOver = true;
    }
    else if (wrongGuesses >= 6) {
        losses++;
        updateScore();
        displayMessage(`Game over! Buzz was abducted! The word was ${hiddenWord}`);
        gameOver = true;
    }

    console.log(`You guessed the letter: ${guessedLetter}`);
}

function moveSpaceman() {
    const spaceman = document.querySelector('.spaceman');
    if (wrongGuesses >= 6) {
        displayMessage('Game over! Buzz was abducted!');
        spaceman.style.visibility = 'hidden';
        } else { 
        spaceman.style.transform = `translateY(${wrongGuesses * -60}px)`;
        spaceman.style.visibility = 'visible';

    }
}
function displayMessage(text) {
    const messageElement = document.getElementById('message');
    if (text) {
        messageElement.textContent = text;
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
}

function updateScore() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    }


function resetGame() {
    gameOver = false;
    selectRandomWord();
    wrongGuesses = 0;
    moveSpaceman();

    const letterButtons = document.querySelectorAll('.letter-btn');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('unlit');
    }); 

    displayWord();
    displayMessage('');


    const spaceman = document.querySelector('.spaceman');
    spaceman.style.visibility = 'visible';
}

document.getElementById('new-game').addEventListener('click', resetGame);

generateAlphabet();
resetGame();