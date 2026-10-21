const players = [
  { id: 1,  name: "Player 1",  team: "Team Alpha",   price: 10.0 },
  { id: 2,  name: "Player 2",  team: "Team Alpha",   price: 9.5 },
  { id: 3,  name: "Player 3",  team: "Team Alpha",   price: 8.5 },
  { id: 4,  name: "Player 4",  team: "Team Alpha",   price: 7.5 },
  { id: 5,  name: "Player 5",  team: "Team Alpha",   price: 6.5 },
  { id: 6,  name: "Player 6",  team: "Team Bravo",   price: 9.0 },
  { id: 7,  name: "Player 7",  team: "Team Bravo",   price: 8.5 },
  { id: 8,  name: "Player 8",  team: "Team Bravo",   price: 8.0 },
  { id: 9,  name: "Player 9",  team: "Team Bravo",   price: 7.0 },
  { id: 10, name: "Player 10", team: "Team Bravo",   price: 6.0 },
  { id: 11, name: "Player 11", team: "Team Charlie", price: 9.5 },
  { id: 12, name: "Player 12", team: "Team Charlie", price: 8.0 },
  { id: 13, name: "Player 13", team: "Team Charlie", price: 7.5 },
  { id: 14, name: "Player 14", team: "Team Charlie", price: 6.5 },
  { id: 15, name: "Player 15", team: "Team Charlie", price: 6.0 },
];

const STARTING_BUDGET = 40.0;
const SQUAD_SIZE = 5;
let squad = [];
const MAX_PER_TEAM = 3;

function budgetLeft() {
  let spent = 0;
  for (const p of players) {
    if (squad.includes(p.id)) spent += p.price;
  }
  return STARTING_BUDGET - spent;
}

function teamCount(team) {
  let n = 0;
  for (const p of players) {
    if (squad.includes(p.id) && p.team === team) n++;
  }
  return n;
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

        if (teamCount(player.team) >= MAX_PER_TEAM) {
      alert("Max " + MAX_PER_TEAM + " players from one team");
      return;
    }

    if (player.price > budgetLeft()) {
      alert("Not enough budget");
      return;
    }
    squad.push(id);
  }
  render();
    const squadList = document.getElementById("squad-list");
  squadList.innerHTML = "";
  for (const p of players) {
    if (!squad.includes(p.id)) continue;
    const li = document.createElement("li");
    li.textContent = p.name + " (" + p.team + ") - " + p.price.toFixed(1);
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", function () { togglePlayer(p.id); });
    li.appendChild(btn);
    squadList.appendChild(li);
  }
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
  document.getElementById("spent").textContent = (STARTING_BUDGET - budgetLeft()).toFixed(1);
  document.getElementById("count").textContent = squad.length;
}

render();