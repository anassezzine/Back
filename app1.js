const fs = require('fs');
const readline = require('readline');


// Lire le fichier des utilisateurs
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

// Définir les options du menu
const menu = [
  { name: 'Compter les utilisateurs par pays', value: 'country' },
  { name: 'Compter les utilisateurs par entreprise', value: 'company' },
  { name: 'Quitter', value: 'quit' },
];


// Afficher le menu
function displayMenu() {
  console.log('Que voulez-vous faire ?');
  menu.forEach((option, index) => {
    console.log(`${index + 1}. ${option.name}`);
  });
}

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

// Trier les pays par ordre décroissant de compteur d'utilisateurs
function sortByCountCountry()
{
  const sortedByCount = Object.entries(countByCountry).sort((a, b) => b[1] - a[1]);
  return sortedByCount;
}

// Trier les companies par ordre décroissant de compteur d'utilisateurs
function sortByCountCompany()
{
  const sortedByCount = Object.entries(countByComapany).sort((a, b) => b[1] - a[1]);
  return sortedByCount;
}

// Afficher la liste des pays et le compteur d'utilisateurs à côté
function print(sortedByCount)
{
  sortedByCount.forEach(([country, count]) => {
    console.log(`${country} - ${count}`);
  })
}

if(getArg(2) === 'country')
{
  countByCountry = getCounterCountry()
  sortedByCount = sortByCountCountry();
  print(sortedByCount);
}
else if(getArg(2) === 'company')
{
  countByCompany = getCounterCompany();
  sortedByCount = sortByCountCompany();
  print(sortedByCount);
}

// Démarrer le programme en affichant le menu
displayMenu();