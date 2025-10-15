let money = 0;
let energy = 0;
let stardust = 0;
let clickPower = 1;
const moneyDisplay = document.getElementById('money');
const energyDisplay = document.getElementById('energy');
const stardustDisplay = document.getElementById('stardust');
const button = document.getElementById('clickButton');
const shopItems = document.getElementById('shopItems');

const upgrades = [
  { name: "🐶 Puppy Boost", cost: 20, gain: 2, type: "energy" },
  { name: "💸 Cash Factory", cost: 100, gain: 5, type: "money" },
  { name: "⚡ Generator", cost: 500, gain: 10, type: "energy" },
  { name: "🌌 Star Miner", cost: 2000, gain: 25, type: "stardust" },
  { name: "🚀 Space Company", cost: 10000, gain: 100, type: "money" },
  { name: "🪐 Planet Upgrade", cost: 25000, gain: 200, type: "stardust" },
  { name: "👑 Cosmic Empire", cost: 100000, gain: 1000, type: "money" },
  { name: "💫 Infinity Reactor", cost: 1000000, gain: 5000, type: "energy" },
  { name: "🎁 Secret Surprise", cost: 9999999, gain: 99999, type: "random" }
];

function updateShop() {
  shopItems.innerHTML = '';
  upgrades.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `${item.name} - <b>${item.cost}</b>`;
    div.onclick = () => buyItem(i);
    shopItems.appendChild(div);
  });
}

function buyItem(i) {
  const item = upgrades[i];
  if (money >= item.cost) {
    money -= item.cost;
    if (item.type === "money") money += item.gain;
    if (item.type === "energy") energy += item.gain;
    if (item.type === "stardust") stardust += item.gain;
    if (item.type === "random") {
      const r = Math.random();
      if (r < 0.33) money += item.gain;
      else if (r < 0.66) energy += item.gain;
      else stardust += item.gain;
    }
    clickPower += Math.floor(item.gain / 10);
    updateDisplay();
    playSound('buy');
    alert(`✨ You bought ${item.name}! Click Power is now ${clickPower}`);
  } else {
    playSound('error');
    alert("Not enough money!");
  }
}

function playSound(type) {
  const audio = new Audio();
  if (type === 'click') audio.src = 'https://actions.google.com/sounds/v1/cartoon/pop.ogg';
  if (type === 'buy') audio.src = 'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg';
  if (type === 'error') audio.src = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
  audio.play();
}

function spawnEmoji() {
  const emojis = ['💸','⚡','🌌','🐶','🌈','🔥','💎','⭐'];
  const e = document.createElement('div');
  e.className = 'emoji';
  e.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.left = (Math.random() * window.innerWidth) + 'px';
  e.style.top = (Math.random() * window.innerHeight) + 'px';
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 1000);
}

function updateDisplay() {
  moneyDisplay.textContent = money;
  energyDisplay.textContent = energy;
  stardustDisplay.textContent = stardust;
}

button.addEventListener('click', () => {
  money += clickPower;
  energy += Math.floor(clickPower / 2);
  stardust += Math.floor(clickPower / 4);
  updateDisplay();
  spawnEmoji();
  playSound('click');
});

updateShop();