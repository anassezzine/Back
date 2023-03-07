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

// Créer l'interface de ligne de commande pour lire les entrées utilisateur
const readl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Lire l'entrée utilisateur
function readInput() {
  readl.question(`Entrez un chiffre entre 1 et ${menu.length}: `, (answer) => {
    const optionIndex = parseInt(answer) - 1;
    if (optionIndex >= 0 && optionIndex < menu.length) {
      const option = menu[optionIndex];
      if (option.value === 'quit') {
        readl.close();
      }else {
        counter(option.value);
      }
    } else {
      console.log(`Choix invalide. Entrez un chiffre entre 1 et ${menu.length}.`);
      readInput();
    }
  });
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
  const sortedByCount = Object.entries(countByCompany).sort((a, b) => b[1] - a[1]);
  return sortedByCount;
}

// Afficher la liste des pays et le compteur d'utilisateurs à côté
function printCountry(sortedByCount)
{
  sortedByCount.forEach(([country, count]) => {
    console.log(`${country} - ${count}`);
  })
  readInput();
}

function printCompany(sortedByCount)
{
  sortedByCount.forEach(([company, count]) => {
    console.log(`${company} - ${count}`);
  })
  readInput();
}

function counter(counterby)
{
  if(counterby === 'country')
{
  countByCountry = getCounterCountry()
  sortedByCount = sortByCountCountry();
  printCountry(sortedByCount);
}
else if(counterby === 'company')
{
  countByCompany = getCounterCompany();
  sortedByCount = sortByCountCompany();
  printCompany(sortedByCount);
} 
}


// Démarrer le programme en affichant le menu
displayMenu();
readInput();