let wins = 0;
let losses = 0;
let gameOver = false;

const hiddenWord ="HELLO";
let currentWordState = new Array(hiddenWord.length).fill('_');
let wrongGuesses = 0;

function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    
    currentWordState.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter === '_' ? '_ ' : letter + ' ';
        wordDisplay.appendChild(letterElement);
    });
}

// Function to generate the alphabet and handle interactions
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

// Function to handle letter click
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
    if (wrongGuesses >= 6) {
        losses++;
        updateScore();
        displayMessage('Game over! The spaceman has been abducted!');
        gameOver = true;
    }

    console.log(`You guessed the letter: ${guessedLetter}`);
}

// Function to move the spaceman
function moveSpaceman() {
    const spaceman = document.querySelector('.spaceman img');
    spaceman.style.transform = `translateY(${wrongGuesses * -8}px)`; 
}

function updateScore() {
document.getElementById('wins').textContent = wins;
document.getElementById('losses').textContent = losses;
}

// Function to reset the game for a new round
function resetGame() {
    gameOver = false;
    currentWordState = new Array(hiddenWord.length).fill('_');
    
    wrongGuesses = 0;
    moveSpaceman();

    const letterButtons = document.querySelectorAll('.letter-btn');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('unlit');
    }); 

    displayWord();
    displayMessage('');
}

document.getElementById('new-game').addEventListener('click', resetGame);

generateAlphabet();
displayWord();