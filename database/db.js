const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

module.exports = (success, error) => {
    // create mongoose connect server
    const connectDb = async () => {
        return await mongoose.connect(process.env.MONGOOSE).then(() => {
            console.log('mongoose is up adn running');
        });
    };
    // create recallBack only run once
    const successConnect = async () => {
        return await mongoose.connection.once('open', () => {
            success();
        });
    };
    // create connect error recallBack
    const errorConnect = async () => {
        return await mongoose.connection.on('error', () => {
            error();
        });
    };
    // create close recallBack
    const disConnect = async () => {
        return await mongoose.connection.on('close', () => {
            console.log('mongoose is closed');
        });
    };
    // run
    connectDb();
    //run
    successConnect();
    //
    errorConnect();
    //
    disConnect();
};
