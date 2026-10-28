function calcPoints(s, teamWon) {
  let pts = 0;
  pts += s.kills * 1;
  pts += s.assists * 0.5;
  pts -= s.deaths * 0.5;
  if (teamWon) pts += 3;
  if (s.mvp) pts += 3;
  return pts;
}

function teamOf(id) {
  const p = players.find(function (x) { return x.id === id; });
  return p ? p.team : null;
}

function teamWonInRound(team, round) {
  for (const m of round.matches) {
    if (m.teamA === team || m.teamB === team) {
      return m.winner === team;
    }
  }
  return false;
}

function pointsInRound(id, round) {
  const s = round.stats[id];
  if (!s) return 0;
  const won = teamWonInRound(teamOf(id), round);
  let pts = calcPoints(s, won);
  if (id === captainId) pts *= 2;
  return pts;
}

function pointsFor(id) {
  let total = 0;
  for (const round of rounds) {
    total += pointsInRound(id, round);
  }
  return total;
}

const STARTING_BUDGET = 40.0;
const SQUAD_SIZE = 5;
let squad = [];
let captainId = null;
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
    if (captainId === id) captainId = null;
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

  const squadList = document.getElementById("squad-list");
  squadList.innerHTML = "";
  for (const p of players) {
    if (!squad.includes(p.id)) continue;
    const li = document.createElement("li");
    const label = p.id === captainId ? " (C)" : "";
    li.textContent = p.name + label + " (" + p.team + ") - " + p.price.toFixed(1) + " | " + pointsFor(p.id).toFixed(1) + " pts";

    const capBtn = document.createElement("button");
    capBtn.textContent = "Captain";
    capBtn.addEventListener("click", function () {
      captainId = p.id;
      render();
    });
    li.appendChild(capBtn);

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", function () { togglePlayer(p.id); });
    li.appendChild(btn);

    squadList.appendChild(li);
  }

  let total = 0;
  for (const id of squad) {
    total += pointsFor(id);
  }
  document.getElementById("points").textContent = total.toFixed(1);
}

render();