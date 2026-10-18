const players = [
  { id: 1, name: "Player One", team: "Team Alpha", price: 10.0 },
  { id: 2, name: "Player Two", team: "Team Alpha", price: 9.5 },
  { id: 3, name: "Player Three", team: "Team Bravo", price: 8.0 },
  { id: 4, name: "Player Four", team: "Team Bravo", price: 7.5 },
  { id: 5, name: "Player Five", team: "Team Charlie", price: 9.0 },
  { id: 6, name: "Player Six", team: "Team Charlie", price: 6.5 },
  { id: 7, name: "Player Seven", team: "Team Delta", price: 8.5 },
];

const STARTING_BUDGET = 40.0;
const SQUAD_SIZE = 5;
let squad = [];

function budgetLeft() {
  let spent = 0;
  for (const p of players) {
    if (squad.includes(p.id)) spent += p.price;
  }
  return STARTING_BUDGET - spent;
}

function togglePlayer(id) {
  if (squad.includes(id)) {
    squad = squad.filter(function (x) { return x !== id; });
  } else {
    const player = players.find(function (p) { return p.id === id; });
    if (squad.length >= SQUAD_SIZE) {
      alert("Squad is full");
      return;
    }
    if (player.price > budgetLeft()) {
      alert("Not enough budget");
      return;
    }
    squad.push(id);
  }
  render();
}

function render() {
  const list = document.getElementById("player-list");
  list.innerHTML = "";
  for (const p of players) {
    const li = document.createElement("li");
    li.textContent = p.name + " - " + p.team + " - " + p.price.toFixed(1);
    if (squad.includes(p.id)) li.classList.add("picked");
    li.addEventListener("click", function () { togglePlayer(p.id); });
    list.appendChild(li);
  }
  document.getElementById("budget").textContent = budgetLeft().toFixed(1);
  document.getElementById("count").textContent = squad.length;
}

render();