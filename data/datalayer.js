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
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let newclients = JSON.parse(rawdata);
        //filter permet de retirer un user en fonction du param removeuser
        const id = newclients.findIndex(user => user.id === parseInt(removeuser));
        console.log(id);
        if (id !== -1) {
            newclients.splice(id, 1);
            fs.writeFileSync(file, JSON.stringify(newclients, null, 2));
            return { success: true, message: "User got deleted." };
        } else
            return { success: false, message: "ID Not found." };
    },

};

module.exports = datalayer;
