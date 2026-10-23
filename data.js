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

// Fake stats for one round. Missing players score 0.
const stats = {
  1:  { kills: 42, deaths: 30, assists: 8,  teamWon: true,  mvp: true },
  2:  { kills: 35, deaths: 28, assists: 12, teamWon: true,  mvp: false },
  3:  { kills: 28, deaths: 31, assists: 6,  teamWon: true,  mvp: false },
  6:  { kills: 30, deaths: 34, assists: 5,  teamWon: false, mvp: false },
  7:  { kills: 25, deaths: 36, assists: 9,  teamWon: false, mvp: false },
  11: { kills: 38, deaths: 27, assists: 10, teamWon: true,  mvp: false },
};