const mongoose = require('mongoose');

// create document construct object
// set attribution 、value and type in collection
let userSchema = mongoose.Schema({
    // id
    // firstName lastName address city state zip email password
    // define rules
    // _id: mongoose.Schema.Types.ObjectId, //mongoose self define id
    firstName: {
        type: String,
        required: true, // define must or can choose
    },
    lastName: {
        type: String,
        required: true, // define must or can choose
    },
    address: {
        type: String,
        required: true, // define must or can choose
    },
    city: {
        type: String,
        required: true, // define must or can choose
    },
    zipCode: {
        type: String,
        required: true, // define must or can choose
    },
    state: {
        type: String,
        required: true, // define must or can choose
    },
    email: {
        type: String,
        required: true, // define must or can choose
    },
    password: {
        type: String,
        required: true, // define must or can choose
    },
});

// create model object, wrapper document to object

let userModel = mongoose.model('firstUser', userSchema);
module.exports = userModel;
