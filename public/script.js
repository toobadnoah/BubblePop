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
  let emojiPool = [];

  if (allEmojis.length >= 25) {
    emojiPool = allEmojis.slice(0, 25);
  } else {
    while (emojiPool.length < 25) {
      emojiPool = emojiPool.concat(allEmojis);
    }
    emojiPool = emojiPool.slice(0, 25);
  }

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

  // Check if all bubbles popped to launch confetti
  const allPopped = [...grid.children].every(b => b.classList.contains('pop'));
  if (allPopped) {
    launchConfetti();
  }
}

function launchConfetti() {
  const confettiCount = 100;
  const confettiColors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7'];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = (Math.random() * 3) + 's';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    confetti.addEventListener('animationend', () => confetti.remove());
  }
}

resetBtn.addEventListener('click', createGrid);

createGrid();
