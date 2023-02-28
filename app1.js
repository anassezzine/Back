const fs = require('fs');

// Lire le fichier des utilisateurs
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

// Récupérer l'argument d'entrée
// indice est la position de l'élèment qu'on veut récuperer 
function getArg()
{
  const input = process.argv[2];
  return input;
}

// Calculer le compteur d'utilisateurs par pays
function getCounterCountry()
{
  const countByCountry = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] ?? 0) + 1;
    return acc;
  }, {});
  return countByCountry;
}

// Calculer le compteur d'utilisateurs par company
function getCounterCompany()
{
  const countByComapny = users.reduce((acc, user) => {
    acc[user.company] = (acc[user.company] ?? 0) + 1;
    return acc;
  }, {});
  return countByComapny;
}

if(getArg(2) === 'country')
{
    // Calculer le compteur d'utilisateurs par pays
  countByCountry = getCounterCountry()

  // Trier les pays par ordre décroissant de compteur d'utilisateurs
  const sortedByCount = Object.entries(countByCountry).sort((a, b) => b[1] - a[1]);

  // Afficher la liste des pays et le compteur d'utilisateurs à côté
  sortedByCount.forEach(([country, count]) => {
    console.log(`${country} - ${count}`);
  });
}

else if(getArg(2) === 'company')
{
    // Calculer le compteur d'utilisateurs par company
  const countByCompany = getCounterCompany()

  // Trier les companies par ordre décroissant de compteur d'utilisateurs
  const sortedByCount = Object.entries(countByCompany).sort((a, b) => b[1] - a[1]);

  // Afficher la liste des companies et le compteur d'utilisateurs à côté
  sortedByCount.forEach(([company, count]) => {
    console.log(`${company} - ${count}`);
  });
}