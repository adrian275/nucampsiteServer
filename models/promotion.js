//import mongoose and campsite model
const mongoose = require('mongoose');
//making a short hand Schema to the mongoose.schema function
const Schema = mongoose.Schema;
//instantiates new schema object 

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    image: {
        type: String, 
        required: true
    }, 
    featured: {
        type: String, 
        required: true
    },
    cost: {
        type: Currency, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
 }, {
    timestamps: true
 });
 //create a model
//returns a constructor function
const Promotion = mongoose.model('Promotion', promotionSchema);
//export model
module.exports = Promotion;