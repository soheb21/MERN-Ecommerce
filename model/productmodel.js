const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    //example code
    // "title": "iPhone 9",
    // "description": "An apple mobile which is nothing like apple",
    // "brand": "Apple",
    // "category": "smartphones",
    // "price": 5489,
    // "discountPercentage": 12.96,
    // "stock": 94,
    // "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    // "images": [
    //   "https://i.dummyjson.com/data/products/1/1.jpg",
    //   "https://i.dummyjson.com/data/products/1/2.jpg",
    //   "https://i.dummyjson.com/data/products/1/3.jpg",
    //   "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    // ],
    // "rating": 4.69,

    //schema
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, min: [1, 'wrong min price'], max: [10000, 'wrong max price'] },
    discountPercentage: { type: Number, min: [1, 'wrong min discount'], max: [99, 'wrong max discount'] },
    stock: { type: Number, min: [0, 'wrong min stock'], default: 0 },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [mongoose.Schema.Types.Mixed] },
    sizes: { type: [mongoose.Schema.Types.Mixed] },
    // highlights: { type: [String] },
    // discountPrice: { type: Number },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max price'], default: 0 },
    deleted: { type: Boolean, default: false },
})

//convert _id to id.
const virtualId = productSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const ProductModel = mongoose.model("products", productSchema)
module.exports = ProductModel;