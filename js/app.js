// Store the hidden word (hardcoded for now)
const hiddenWord = "HELLO";

// Array to keep track of the current state of the word (e.g., ['_', '_', '_', '_', '_'])
let currentWordState = new Array(hiddenWord.length).fill('_');

// Display the word (either as underscores or with correct guesses)
function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = ''; // Clear the display

    // Display the current state of the word (e.g., _ _ L _ _ )
    currentWordState.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter + ' '; // Display either the underscore or the guessed letter
        wordDisplay.appendChild(span);
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
        
        // Add an event listener for when the letter button is clicked
        button.addEventListener('click', function() {
            handleLetterClick(button);
        });

        alphabetContainer.appendChild(button);
    });
}

// Function to handle letter click
function handleLetterClick(button) {
    const guessedLetter = button.getAttribute('data-letter');
    
    // Mark the letter as used by adding the 'unlit' class
    button.classList.add('unlit');
    button.disabled = true;

    // Check if the guessed letter is in the hidden word
    if (hiddenWord.includes(guessedLetter)) {
        // Loop through the word to find all instances of the guessed letter
        hiddenWord.split('').forEach((letter, index) => {
            if (letter === guessedLetter) {
                currentWordState[index] = guessedLetter; // Reveal the letter at the correct position
            }
        });
    }

    // Update the displayed word with the newly revealed letters
    displayWord();

    console.log(`You guessed the letter: ${guessedLetter}`);
}

// Initialize the game
generateAlphabet();
displayWord(); // Display the underscores when the page loads

let wrongGuesses = 0; // Counter for wrong guesses

function handleLetterClick(button) {
    const guessedLetter = button.getAttribute('data-letter');
    
    // Mark the letter as used by adding the 'unlit' class
    button.classList.add('unlit');
    button.disabled = true;

    // Check if the guessed letter is in the hidden word
    if (hiddenWord.includes(guessedLetter)) {
        // Correct guess: Reveal the letter
        hiddenWord.split('').forEach((letter, index) => {
            if (letter === guessedLetter) {
                currentWordState[index] = guessedLetter;
            }
        });
    } else {
        // Incorrect guess: Move the spaceman closer to the spaceship
        wrongGuesses++; // Increment the wrong guess count
        moveSpaceman(); // Call the function to move the spaceman
    }

    displayWord(); // Update the word display

    console.log(`You guessed the letter: ${guessedLetter}`);
}

function moveSpaceman() {
    const spaceman = document.querySelector('.spaceman img');
    
    // Move the spaceman based on the number of wrong guesses
    spaceman.style.transform = `translateY(${wrongGuesses * -20}px)`; // Moves the spaceman upward by 20px per wrong guess
    
    // If the wrong guesses reach 6, the player loses
    if (wrongGuesses >= 6) {
        alert('Game over! The spaceman has been abducted!');
        // You can reset the game here if you like
    }
}
