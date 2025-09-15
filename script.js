// Global scope variables
let matches = 0;
let flippedCards = [];
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to create card elements
function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${value}</div>
    </div>
  `;
  return card;
}

// Function to initialize game
function initializeGame() {
  const container = document.getElementById('cardContainer');
  container.innerHTML = '';
  matches = 0;
  flippedCards = [];
  updateScore();

  const shuffledCards = shuffleArray([...cardValues]);
  shuffledCards.forEach(value => {
    const card = createCard(value);
    card.addEventListener('click', () => handleCardClick(card, value));
    container.appendChild(card);
  });
}

// Function to handle card click
function handleCardClick(card, value) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push({ card, value });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Function to check for card matches
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.value === card2.value) {
    matches++;
    updateScore();
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.card.classList.remove('flipped');
      card2.card.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Function to update score display
function updateScore() {
  document.getElementById('score').textContent = matches;
  return matches;
}

// Event listener for reset button
document.getElementById('resetButton').addEventListener('click', initializeGame);

// Initialize game on page load
initializeGame();