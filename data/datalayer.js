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
    // read json file
    const data = fs.readFileSync(filename);

    // parse to object
    let customers = JSON.parse(data);

    // generate unique ID for the new customer
    customer.id = customers.length + 1;

    // add new customer to array
    customers.push(customer);

    // write to file
    fs.writeFileSync(filename, JSON.stringify(customers, null, 2));

    // return the newly added customer
    return customer;
  },

  updateCustomer: function (id, updatedCustomer) {
    // read json file
    const data = fs.readFileSync(filename);

    // parse to object
    let customers = JSON.parse(data);

    // find the index of the customer to update
    const index = customers.findIndex((customer) => customer.id === id);

    if (index !== -1) {
      // update the customer object
      customers[index] = updatedCustomer;

      // write to file
      fs.writeFileSync(filename, JSON.stringify(customers, null, 2));

      // return the updated customer
      return updatedCustomer;
    } else {
      // return null if customer not found
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
