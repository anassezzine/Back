const dal = require("../data/datalayer");
const express = require("express");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 100;

const business = {
    getAllCustomers: function () {
        return dal.getAllCustomers();
    },

    getCustomers: function (number, page) {
        // Vérifier les paramètres
        if (number === undefined || page === undefined) {
            number = defaultNumber;
            page = defaultPage;
        }
        if (number > maxNumber) {
            number = maxNumber;
        }

        // Récupérer les données de la DAL
        const resCustomers = dal.getCustomers(number, page);

        // Ajouter des informations supplémentaires
        const totalPages = Math.ceil(resCustomers.total / number);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        // Construire l'objet réponse
        const response = {
            customers: resCustomers.result,
            pagination: {
                numberByPage: number,
                page: page,
                total: resCustomers.total,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
            },
        };

        // Retourner la réponse
        return response;
    },

    addCustomer: function (customer) {
        // Ajoute le nouveau client à la base de données via le datalayer
        const newCustomer = dal.addCustomer(customer);

        return newCustomer;
    },

    updateCustomer: function (customer) {
        // Met à jour le client dans la base de données via le datalayer
        dal.updateCustomer(customer);
    },

    deleteCustomer: function (customer) {
        dal.deleteCustomer(customer);
    }

};

module.exports = business;