const allEmojis = [
  '🫧', '💨', '🌬️', '💦', '🌊', '💧', '❄️',
  '🍩', '🍪', '🧁', '🍰', '🎂', '🍫', '🍬',
  '🐸', '🐵', '🦊', '🐯', '🦁', '🐰', '🐼',
  '🎈', '🎉', '🎊', '🎁', '🎵', '🎶', '💎',
  '💠', '🔷', '🔹', '🔸', '✨', '⚡', '🌸',
  '🌼', '🌻', '🌺', '🌷', '🌹', '🥀', '💥',
  '🔥', '🌟', '🌠', '🎇'
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
  const shuffled = shuffle([...allEmojis]);
  const selected = shuffled.slice(0, 25);

  for (let i = 0; i < 25; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = selected[i];
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

async function appReady() {
  createGrid();

  // Detect if running as Mini App via path or query param
  const url = new URL(window.location.href);
  const isMiniApp = url.pathname.startsWith('/mini') || url.searchParams.get('miniApp') === 'true';

  if (isMiniApp) {
    try {
      const { sdk } = await import('@farcaster/frame-sdk');
      await sdk.actions.ready({ disableNativeGestures: true });
      console.log('Farcaster SDK ready() called');
    } catch (err) {
      console.error('Error loading Farcaster SDK:', err);
    }
  } else if (window.farcaster && typeof window.farcaster.ready === 'function') {
    // fallback if old farcaster global exists
    await window.farcaster.ready();
    console.log('Farcaster ready() called');
  } else {
    console.log('Not running inside Farcaster Mini App');
  }
}

window.addEventListener('load', appReady);
