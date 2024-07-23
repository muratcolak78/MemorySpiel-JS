const images = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
    'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'
];

const cardsArray = [...images, ...images];  // Resimlerin her birinden iki tane olacak şekilde birleştiriyoruz.
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let matchedPairs = 0;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cardsArray.sort(() => 0.5 - Math.random());  // Kartları karıştırıyoruz.
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        const cardImage = document.createElement('img');
        cardImage.src = cardsArray[i];
        card.appendChild(cardImage);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
        cardsChosen.push(cardsArray[cardId]);
        cardsChosenId.push(cardId);
        this.firstChild.style.display = 'block';
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        matchedPairs++;
    } else {
        cards[optionOneId].firstChild.style.display = 'none';
        cards[optionTwoId].firstChild.style.display = 'none';
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (matchedPairs === images.length) {
        alert('Herzlichen Glückwunsch! Du hast das Spiel abgeschlossen.');
        resetBoard();
    }
}

function resetBoard() {
    cardsWon = [];
    matchedPairs = 0;
    createBoard();
}

document.getElementById('start-button').addEventListener('click', () => {
    createBoard();
    setTimeout(() => {
        const cards = document.querySelectorAll('.card img');
        cards.forEach(card => {
            card.style.display = 'none';
        });
    }, 2000);
});
