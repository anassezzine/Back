const fs = require("fs");
const path = require("path");
const { get } = require("http");

const filename = path.join(__dirname, "../data/customers.json");

const datalayer = {
    getAllCustomers: function () {
        // read json file
        const data = fs.readFileSync(filename, "utf8");

        // parse to object
        const customers = JSON.parse(data);

        // return customers
        return customers;
    },

    getCustomers: function (number, page) {
        // read json file
        const data = fs.readFileSync(filename);

        // parse to object
        let customers = JSON.parse(data);

        const total = customers.length;

        // filter by number and page
        if (number && page) {
            customers = customers.slice((page - 1) * number, page * number);
        }

        const result = {
            total: total,
            result: customers,
        };

        return result;
    },

    addCustomer: function (customer) {
        // Récupère la liste des clients depuis le fichier JSON
        let customers = this.getAllCustomers();

        // Génère un nouvel identifiant pour le client en fonction du dernier identifiant de la liste
        const lastId = customers.length > 0 ? customers[customers.length - 1].id : 0;
        customer.id = lastId + 1;

        // Ajoute le nouveau client à la liste
        customers.push(customer);
        console.log(customer);
        // Écrit la nouvelle liste de clients dans le fichier JSON
        fs.writeFileSync(filename, JSON.stringify(customers));

        return customer;
    },


    updateCustomer: function (id, customer) {
        // Récupère la liste des clients depuis le fichier JSON
        let customers = this.getAllCustomers();

        // Trouve le client correspondant à l'identifiant donné
        const index = customers.findIndex(c => c.id === id);

        if (index !== -1) {
            // Met à jour le client correspondant
            customers[index] = { ...customers[index], ...customer };

            // Écrit la nouvelle liste de clients dans le fichier JSON
            fs.writeFileSync(filename, JSON.stringify(customers));

            return customers[index];
        } else {
            return null;
        }
    },

    deleteCustomer: function (id) {
        let customers = this.getAllCustomers();
        const index = customers.findIndex(c => c.id === id);
        if (index >= 0) {
            const customer = customers[index];
            customers.splice(index, 1);
            return customer;
        } else {
            return null;
        }
    },
};

module.exports = datalayer;
