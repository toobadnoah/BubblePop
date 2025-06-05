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

  const allEmojis = [...new Set(emojiThemes.flat())];
  const emojiPool = shuffle(allEmojis).slice(0, 25);

  emojiPool.forEach((emoji) => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = emoji;
    bubble.addEventListener('click', () => popBubble(bubble));
    grid.appendChild(bubble);
  });
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
