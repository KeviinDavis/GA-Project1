let wins = 0;
let losses = 0;
let gameOver = false; //Flag to determine if the game is over

// List of words to guess
const wordList =["SPACE", "ALIEN", "STARS"];
let hiddenWord = "";
let currentWordState = [];
let wrongGuesses = 0;


// Function to randomly select a word from the wordList
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    hiddenWord = wordList[randomIndex];
    currentWordState = new Array(hiddenWord.length).fill('_');
}

// Function to display the current word state (with underscores and guessed letters
function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    
    currentWordState.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter === '_' ? '_ ' : letter + ' ';
        wordDisplay.appendChild(letterElement);
    });
}
// Function to generate the alphabet buttons dynamically
function generateAlphabet() {
    const alphabetContainer = document.getElementById('alphabet');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-btn');
        button.setAttribute('data-letter', letter); // Store the letter in the button's data attribute
        
// Event listener for handling letter button clicks
       
        button.addEventListener('click', function() {
            handleLetterClick(button);
        });

        alphabetContainer.appendChild(button);
    });
}
// Function to display a message on the screen (e.g., win or loss)

function displayMessage(text) {
    document.getElementById('message').textContent = text;
}
// Function to handle when a letter is clicked
function handleLetterClick(button) {
    if (gameOver) return;
    const guessedLetter = button.getAttribute('data-letter');
    
    button.classList.add('unlit'); // Visually disable the button
    button.disabled = true;

// Check if the guessed letter is in the hidden word
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

    // Check if the player has won (all letters guessed)
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
        gameOver = true; //End the Game
    }

    console.log(`You guessed the letter: ${guessedLetter}`);
}


// Function to move the spaceman based on wrong guesses
function moveSpaceman() {
    const spaceman = document.querySelector('.spaceman');
    if (wrongGuesses >= 6) {
        displayMessage('Game over! Buzz was abducted!');
        spaceman.style.visibility = 'hidden';
        } else { 
        spaceman.style.transform = `translateY(${wrongGuesses * -70}px)`;
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

// Function to reset the game for a new round
    function resetGame() {
        gameOver = false;
        selectRandomWord();
        wrongGuesses = 0;
        moveSpaceman();


// Enable all letter buttons for the new round
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

// Event listener for the New Game button to reset the game
document.getElementById('new-game').addEventListener('click', resetGame);

// Initialize the game on page load
    generateAlphabet();
    resetGame(); // Automatically start the game when the page loads