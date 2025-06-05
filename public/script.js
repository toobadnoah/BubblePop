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

  // Combine all emojis from all themes into one set to remove duplicates
  const allEmojis = [...new Set(emojiThemes.flat())];

  // Prepare emojiPool with up to 25 unique emojis
  let emojiPool = [];

  if (allEmojis.length >= 25) {
    emojiPool = allEmojis.slice(0, 25);
  } else {
    // If less than 25 unique emojis total, repeat emojis to fill 25
    while (emojiPool.length < 25) {
      emojiPool = emojiPool.concat(allEmojis);
    }
    emojiPool = emojiPool.slice(0, 25);
  }

  // Shuffle emojiPool to randomize placement
  shuffle(emojiPool);

  // Create 25 bubbles with unique emojis
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
