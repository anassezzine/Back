const express = require("express");
const business = require("../business/business");

const app = express();

const apiServ = {
    start: function (port) {
        app.use(express.json());

        app.get("/api/customers", function (req, res) {
            const number = req.query.number;
            const page = req.query.page;

            const customers = business.getCustomers(number, page);

            res.json(customers);
        });

        app.post("/api/customers", function (req, res) {
            const customer = req.body;
        
            // Appelle la fonction addCustomer du module business pour ajouter le client
            const newCustomer = business.addCustomer(customer);
        
            // Retourne le nouveau client créé avec un code HTTP 201
            res.status(201).json(newCustomer);
        });

        app.put("/api/customers/:id", function (req, res) {
            const id = parseInt(req.params.id);
            const customer = req.body;
        
            // Appelle la fonction updateCustomer du module business pour mettre à jour le client
            const updatedCustomer = business.updateCustomer(id, customer);
        
            if (updatedCustomer) {
                // Retourne le client mis à jour avec un code HTTP 200
                res.json(updatedCustomer);
            } else {
                // Retourne un message d'erreur avec un code HTTP 404 si le client n'a pas été trouvé
                res.status(404).json({ message: "Client not found" });
            }
        });

        app.delete("/api/customers/:id", function (req, res) {
            const id = req.params.id;

            // TODO: Ajouter la logique pour supprimer un client
            throw new Error("Not implemented yet");
        });

        app.listen(port, function () {
            console.log("Server running on port " + port);
        });
    },
};

module.exports = apiServ;
