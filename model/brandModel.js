const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    //schema
    value: { type: String, required: true },
    label: { type: String, required: true },

})

//convert _id to id.
const virtualId = brandSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const brandModel = mongoose.model("brand", brandSchema)
module.exports = brandModel;