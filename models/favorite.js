//import mongoose and campsite model
const mongoose = require('mongoose');
//making a short hand Schema to the mongoose.schema function
const Schema = mongoose.Schema;
//instantiates new schema object 

const favoriteSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        campsites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campsite'
        }]
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Favorite', favoriteSchema);