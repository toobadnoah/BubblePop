const emojiThemes = [
  ['🫧', '💨', '🌬️', '💦', '🌊', '💧', '❄️'], // expanded theme with 7 emojis
  ['🍩', '🍪', '🧁', '🍰', '🎂', '🍫', '🍬'],
  ['🐸', '🐵', '🦊', '🐯', '🦁', '🐰', '🐼'],
  ['🎈', '🎉', '🎊', '🎂', '🎁', '🎵', '🎶'],
  ['💎', '💠', '🔷', '🔹', '🔸', '✨', '⚡'],
  ['🌸', '🌼', '🌻', '🌺', '🌷', '🌹', '🥀'],
  ['💥', '✨', '⚡', '🔥', '🌟', '🌠', '🎇']
];

const grid = document.getElementById('bubble-grid');
const resetBtn = document.getElementById('reset-btn');

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createGrid() {
  grid.innerHTML = '';

  // Pick a random emoji theme
  const emojis = emojiThemes[Math.floor(Math.random() * emojiThemes.length)];

  // We need 25 unique emojis, so repeat the theme enough times
  let emojiPool = [];
  while (emojiPool.length < 25) {
    emojiPool = emojiPool.concat(emojis);
  }
  emojiPool = emojiPool.slice(0, 25); // cut to exact 25

  // Shuffle emoji pool to randomize placement
  shuffle(emojiPool);

  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = emojiPool[i];
    bubble.addEventListener('click', () => popBubble(bubble));
    grid.appendChild(bubble);
  }
}

function popBubble(bubble) {
  if (bubble.classList.contains('pop')) return;

  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  bubble.classList.add('pop');
}

resetBtn.addEventListener('click', createGrid);

createGrid();
