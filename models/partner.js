//import mongoose and campsite model
const mongoose = require('mongoose');
//making a short hand Schema to the mongoose.schema function
const Schema = mongoose.Schema;
//instantiates new schema object 

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const partnerSchema = new Schema({
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
    description: {
        type: String, 
        required: true
    }
 }, {
    timestamps: true
 });
 //create a model
//returns a constructor function
const Partner = mongoose.model('Partner', partnerSchema);
//export model
module.exports = Partner;