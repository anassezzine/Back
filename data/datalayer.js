const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "../data/customers.json");

const datalayer = {
  getAllCustomers: function () {
    // read json file
    const data = fs.readFileSync(filename);

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
    // read json file
    const data = fs.readFileSync(filename);

    // parse to object
    let customers = JSON.parse(data);

    // find the index of the customer to delete
    const index = customers.findIndex((customer) => customer.id === id);

    if (index !== -1) {
      // remove the customer object from the array
      customers.splice(index, 1);

      // write to file
      fs.writeFileSync(filename, JSON.stringify(customers, null, 2));

      // return true to indicate successful deletion
      return true;
    } else {
      // return false if customer not found
      return false;
    }
  },
};

module.exports = datalayer;
