const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    //schema
    items: [{ type: [mongoose.Schema.Types.Mixed], required: true }],
    totalAmount: { type: Number },
    totalItem: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    getAddress: { type: [mongoose.Schema.Types.Mixed] }, //convert array to normal in frontend also

})

//convert _id to id.
const virtualId = orderSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const OrderModel = mongoose.model("order", orderSchema)
module.exports = OrderModel;