const emojiThemes = [
  ['🫧', '💨', '🌬️'],
  ['🍩', '🍪', '🧁'],
  ['🐸', '🐵', '🦊'],
  ['🎈', '🎉', '🎊'],
  ['💎', '💠', '🔷'],
  ['🌸', '🌼', '🌻'],
  ['💥', '✨', '⚡']
];

const grid = document.getElementById('bubble-grid');
const resetBtn = document.getElementById('reset-btn');

let emojis = [];
let bubbles = [];

function createGrid() {
  grid.innerHTML = '';
  emojis = emojiThemes[Math.floor(Math.random() * emojiThemes.length)];

  bubbles = [];
  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    bubble.addEventListener('click', () => popBubble(bubble));
    grid.appendChild(bubble);
    bubbles.push(bubble);
  }
}

function popBubble(bubble) {
  if (bubble.classList.contains('pop')) return;

  // Trigger haptic feedback (Farcaster-supported devices)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  // Add pop animation class
  bubble.classList.add('pop');
}

resetBtn.addEventListener('click', createGrid);

// Initialize on page load
createGrid();

