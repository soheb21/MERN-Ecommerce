const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    //schema

    product: { type:  mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    quantity: { type: Number, required: true },
    size: { type : mongoose.Schema.Types.Mixed},
    color: { type :mongoose.Schema.Types.Mixed},
})

//convert _id to id.
const virtualId = cartSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  cartSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const CartModel = mongoose.model("cart", cartSchema)
module.exports = CartModel;