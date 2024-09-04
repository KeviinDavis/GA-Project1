// console.log('Does this work!');

function generateAlphabet() {
    const alphabetContainer = document.getElementById('alphabet');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-btn');
        button.setAttribute('data-letter', letter); 
        
        alphabetContainer.appendChild(button);
    });
}

generateAlphabet();
