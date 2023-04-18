Bienvenue dans le fichier README du projet API Client !

Ce projet est conçu pour offrir une interface API permettant de gérer une liste de clients. Les fonctionnalités principales de l'API sont les suivantes :

Lister les clients
Ajouter un client
Modifier un client
Supprimer un client
L'API a été développée en utilisant Node.js, Express et JavaScript. Les dépendances nécessaires pour le projet sont listées dans le fichier package.json.

Pour exécuter l'API, vous devez installer les dépendances en utilisant la commande npm install. Ensuite, vous pouvez exécuter le fichier app.js en utilisant la commande node app.js. Par défaut, l'API sera accessible à l'adresse http://localhost:3000.

Endpoints de l'API :

GET /customers : renvoie une liste de tous les clients actuellement enregistrés.
POST /customers : ajoute un nouveau client à la liste.
PUT /customers/:id : met à jour les informations d'un client existant.
DELETE /customers/:id : supprime un client existant de la liste.
Pour utiliser l'API, vous pouvez utiliser un client HTTP tel que Postman ou cURL. Les requêtes doivent être envoyées à l'URL de l'API avec le chemin approprié pour chaque endpoint.

Exemples d'utilisation :

GET http://localhost:3000/customers : renvoie une liste de tous les clients.
POST http://localhost:3000/customers avec un body JSON contenant les informations d'un nouveau client : ajoute un nouveau client à la liste.
PUT http://localhost:3000/customers/1 avec un body JSON contenant les informations mises à jour : met à jour les informations du client avec l'ID 1.
DELETE http://localhost:3000/customers/1 : supprime le client avec l'ID 1 de la liste.
Nous espérons que ce projet sera utile pour vous et n'hésitez pas à nous faire part de vos commentaires et suggestions.