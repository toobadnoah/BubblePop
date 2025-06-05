// Load Farcaster SDK via CDN in HTML (see note below)

const emojiThemes = [
  ['🫧', '💨', '🌬️', '💦', '🌊', '💧', '❄️'],
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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createGrid() {
  grid.innerHTML = '';

  // 1. Pick random theme
  const emojis = emojiThemes[Math.floor(Math.random() * emojiThemes.length)];

  // 2. Build emoji pool: repeat enough times to get >= 25 emojis
  let emojiPool = [];
  while (emojiPool.length < 25) {
    emojiPool = emojiPool.concat(emojis);
  }
  emojiPool = emojiPool.slice(0, 25);

  // 3. Shuffle the emojiPool to randomize order
  shuffle(emojiPool);

  // 4. Create bubbles with unique emojis from shuffled pool
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

async function initialize() {
  createGrid();

  // Wait for Farcaster SDK ready call
  if (window.frame && window.frame.sdk && window.frame.sdk.actions) {
    await window.frame.sdk.actions.ready();
    console.log("Farcaster SDK ready() called.");
  } else {
    console.warn("Farcaster SDK not detected.");
  }
}

initialize();
