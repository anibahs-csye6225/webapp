// models/users.js

const { Sequelize, DataTypes,  } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./../../database');


// Define user model as per database

const User= db.define('User', {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        noUpdate: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        noUpdate: true,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    account_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    timestamps: false,
    schema: 'public'
});




module.exports = User;