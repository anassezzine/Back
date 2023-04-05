// Import des modules nécessaires
const apiServ = require("./presentation/api.js");
const port = 3000;

function main(){
    //pour lancer l'api 
    apiServ.start(port);
  
    //pour lancer la pres console
    //consolePres.start();
  
  }
  
  main();
