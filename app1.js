const fs = require('fs');

// Lire le fichier des utilisateurs
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

// Récupérer l'argument d'entrée
const input = process.argv[2];

if(input === 'country')
{
    // Calculer le compteur d'utilisateurs par pays
  const countByCountry = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {});

  // Trier les pays par ordre décroissant de compteur d'utilisateurs
  const sortedByCount = Object.entries(countByCountry).sort((a, b) => b[1] - a[1]);

  // Afficher la liste des pays et le compteur d'utilisateurs à côté
  sortedByCount.forEach(([country, count]) => {
    console.log(`${country} - ${count}`);
  });
}

else if(input === 'company')
{
    // Calculer le compteur d'utilisateurs par company
  const countByCompany = users.reduce((acc, user) => {
    acc[user.company] = (acc[user.company] || 0) + 1;
    return acc;
  }, {});

  // Trier les companies par ordre décroissant de compteur d'utilisateurs
  const sortedByCount = Object.entries(countByCompany).sort((a, b) => b[1] - a[1]);

  // Afficher la liste des companies et le compteur d'utilisateurs à côté
  sortedByCount.forEach(([company, count]) => {
    console.log(`${company} - ${count}`);
  });
}