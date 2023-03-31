const dal = require("../data/datalayer");
// const _ = require("underscore"); //voir a quoi ca sert
 

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
        // TODO: Implémenter la logique pour ajouter un client
        throw new Error("Not implemented yet");
    },

    updateCustomer: function (id, customer) {
        // TODO: Implémenter la logique pour mettre à jour un client
        throw new Error("Not implemented yet");
    },

    deleteCustomer: function (id) {
        // TODO: Implémenter la logique pour supprimer un client
        throw new Error("Not implemented yet");
    },
};

module.exports = business;