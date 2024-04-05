const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const { DATABASE, HOST_NAME, MONGOD_PORT, COLLECTION } = process.env;
module.exports = (success, error) => {
    //Judgment error and set default value for error
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败~~~');
        };
    }
    // console.log('mongoose', `${DATABASE}://${HOST_NAME}:${MONGOD_PORT}/${COLLECTION}`);
    // create mongoose connect server
    const connectDb = async () => {
        return await mongoose
            .connect(`${DATABASE}://${HOST_NAME}:${MONGOD_PORT}/${COLLECTION}`)
            .then(() => {
                console.log('mongoose is up adn running');
            })
            .catch(e => {
                console.log(e);
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
