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


    updateCustomer: function (customer) {
        //Charge le contenu du fichier JSON
        const data = fs.readFileSync(file);
        const clients = JSON.parse(data);

        // Trouve l'objet à mettre à jour
        const objectid = clients.findIndex(obj => obj.id === customer.id);

        // Si l'objet existe, met à jour ses propriétés avec les données fournies
        if (objectid !== -1) {
            const updatedObject = { ...clients[objectid], ...user };
            clients[objectid] = updatedObject;
            // Écrit le nouveau contenu du fichier JSON
            const updatedData = JSON.stringify(clients, null, 2);
            fs.writeFileSync(file, updatedData);
            console.log(`success`);
        } else {
            console.log(`error`);
        }
    },

    deleteCustomer: function (removecustomer) {
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let newcustomer = JSON.parse(rawdata);
        //filter permet de retirer un user en fonction du param removeuser
        const id = newcustomer.findIndex(customer => customer.id === parseInt(removecustomer));
        console.log(id);
        if (id !== -1) {
            newcustomer.splice(id, 1);
            fs.writeFileSync(file, JSON.stringify(newcustomer, null, 2));
            return { success: true, message: "User got deleted." };
        } else
            return { success: false, message: "ID Not found." };
    },

};

module.exports = datalayer;
