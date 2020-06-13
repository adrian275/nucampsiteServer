//import mongoose and campsite model
const mongoose = require('mongoose');
//making a short hand Schema to the mongoose.schema function
const Schema = mongoose.Schema;
//instantiates new schema object 

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
   rating: {
    type: Number, 
    min: 1, 
    Max: 5, 
    required: true
   },
   text: {
       type: String, 
       required: true
   }, 
   author: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User'
   }
}, {
   timestamps: true
});

const campsiteSchema = new Schema({
    //property for schema
    name: {
        type: String,
        required: true,
        unique: true //no two documents can have the same name field
    },
    //property for shema
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true //sets timestamps to schema, created at, updated at
});
//create a model
//returns a constructor function
const Campsite = mongoose.model('Campsite', campsiteSchema);
//export model
module.exports = Campsite;