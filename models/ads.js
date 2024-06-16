const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    contactInfo: [{
        fullName: { type: String },
        email: { type: String }
    }]
}, {
    collection: 'advertisements',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const STModel = mongoose.model('advertisements', adSchema);
module.exports = STModel;