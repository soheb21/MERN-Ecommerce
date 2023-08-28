const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    //schema
    value: { type: String, required: true },
    label: { type: String, required: true },

})

//convert _id to id.
const virtualId = categorySchema.virtual('id');
virtualId.get(function () {
    return this._id;
})
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const categoryModel = mongoose.model("category", categorySchema)
module.exports = categoryModel;