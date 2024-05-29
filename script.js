const letters = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
];

let placedLetters = [];

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    const dropZone = document.getElementById('dropZone');
    const lettersContainer = document.getElementById('letters');
    const result = document.getElementById('result');
    const checkOrderBtn = document.getElementById('checkOrderBtn');
    const undoBtn = document.getElementById('undoBtn');

    dropZone.innerHTML = '';
    lettersContainer.innerHTML = '';
    result.innerHTML = '';
    placedLetters = [];

    checkOrderBtn.disabled = false;
    undoBtn.disabled = false;

    for (let i = 0; i < 28; i++) {
        const dropSlot = document.createElement('div');
        dropSlot.classList.add('drop-slot');
        dropSlot.ondrop = drop;
        dropSlot.ondragover = allowDrop;
        dropSlot.ondragleave = dragLeave;
        dropSlot.ondragenter = dragEnter;
        dropZone.appendChild(dropSlot);
    }

    const shuffledLetters = shuffleArray([...letters]);
    shuffledLetters.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = letter;
        letterDiv.draggable = true;
        letterDiv.ondragstart = drag;
        lettersContainer.appendChild(letterDiv);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.innerText);
    event.target.classList.add('dragging');
}

function dragEnter(event) {
    event.preventDefault();
    if (event.target.classList.contains('drop-slot') && !event.target.innerText) {
        event.target.classList.add('hovered');
    }
}

function dragLeave(event) {
    if (event.target.classList.contains('drop-slot')) {
        event.target.classList.remove('hovered');
    }
}

function drop(event) {
    event.preventDefault();
    const letter = event.dataTransfer.getData('text');
    const draggingLetter = document.querySelector('.dragging');

    if (event.target.classList.contains('drop-slot') && !event.target.innerText) {
        event.target.innerText = letter;
        placedLetters.push(event.target);
        draggingLetter.remove();
    } else if (event.target.classList.contains('letter')) {
        const dropZone = document.getElementById('dropZone');
        dropZone.appendChild(draggingLetter.cloneNode(true));
        draggingLetter.remove();
    }

    document.querySelectorAll('.hovered').forEach(element => element.classList.remove('hovered'));
    draggingLetter.classList.remove('dragging');
}

function undo() {
    if (placedLetters.length > 0) {
        const lastPlacedSlot = placedLetters.pop();
        const lettersContainer = document.getElementById('letters');
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = lastPlacedSlot.innerText;
        letterDiv.draggable = true;
        letterDiv.ondragstart = drag;
        lettersContainer.appendChild(letterDiv);
        lastPlacedSlot.innerText = '';
    }
}

function checkOrder() {
    const dropSlots = document.querySelectorAll('.drop-slot');
    const result = document.getElementById('result');
    const checkOrderBtn = document.getElementById('checkOrderBtn');
    const undoBtn = document.getElementById('undoBtn');
    let isCorrect = true;
    let score = 0;

    dropSlots.forEach((slot, index) => {
        if (slot.innerText !== letters[index]) {
            isCorrect = false;
            slot.classList.add('wrong');
        } else {
            slot.classList.add('correct');
            score++;
        }
    });

    result.innerHTML = `Score: ${score} out of 28`;
    result.style.fontFamily = 'Arial, sans-serif';

    if (isCorrect) {
        result.innerHTML += '<br>Congratulations! You ordered the letters correctly!';
        result.style.color = 'green';
        result.style.fontFamily = 'Arial, sans-serif';
    } else {
        result.innerHTML += '<br>Try again! The order is incorrect.';
        result.style.color = 'red';
    }

    checkOrderBtn.disabled = true;
    undoBtn.disabled = true;
}

function showCorrectOrder() {
    const dropSlots = document.querySelectorAll('.drop-slot');
    dropSlots.forEach((slot, index) => {
        slot.innerText = letters[index];
        slot.classList.remove('correct', 'wrong'); // Remove any previous class
    });

    const checkOrderBtn = document.getElementById('checkOrderBtn');
    const undoBtn = document.getElementById('undoBtn');
    checkOrderBtn.disabled = false;
    undoBtn.disabled = false;

    setTimeout(() => {
        dropSlots.forEach(slot => {
            slot.innerText = '';
        });
        startGame(); // Restart the game after clearing
    }, 3000);
}

function resetGame() {
    const dropZone = document.getElementById('dropZone');
    const lettersContainer = document.getElementById('letters');
    const result = document.getElementById('result');
    const checkOrderBtn = document.getElementById('checkOrderBtn');
    const undoBtn = document.getElementById('undoBtn');

    dropZone.innerHTML = '';
    lettersContainer.innerHTML = '';
    result.innerHTML = '';
    placedLetters = [];

    checkOrderBtn.disabled = false;
    undoBtn.disabled = false;

    for (let i = 0; i < 28; i++) {
        const dropSlot = document.createElement('div');
        dropSlot.classList.add('drop-slot');
        dropSlot.ondrop = drop;
        dropSlot.ondragover = allowDrop;
        dropSlot.ondragleave = dragLeave;
        dropSlot.ondragenter = dragEnter;
        dropZone.appendChild(dropSlot);
    }

    const shuffledLetters = shuffleArray([...letters]);
    shuffledLetters.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = letter;
        letterDiv.draggable = true;
        letterDiv.ondragstart = drag;
        lettersContainer.appendChild(letterDiv);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startBtn').addEventListener('click', startGame);
});
