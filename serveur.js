// Import des modules nécessaires
const express = require('express');
const apiRoutes = require('./presentation/api');
const business = require('./business/business');
const datalayer = require('./data/datalayer');

// Définition de l'application Express
const app = express();

app.get('/api/customers', (req, res) => {
    const number = req.query.number;
    const page = req.query.page;

    const customers = business.getCustomers(number, page);

    res.json(customers);
});

app.post('/api/customers', (req, res) => {
    const newCustomer = req.body;
    const result = business.addCustomer(newCustomer);

    res.json(result);
});

app.put('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    const updatedCustomer = req.body;
    const result = business.updateCustomer(id, updatedCustomer);

    res.json(result);
});

app.delete('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    const result = business.deleteCustomer(id);

    res.json(result);
});



// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
