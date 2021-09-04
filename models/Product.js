const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    sellerId: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'User' 
    },
    name: { 
        type: String,
        required: true
    },
    
    image: [
        { 
            type: String, 
            required: true 
        }
    ],
    //brand: { type: String, required: true },
    //category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    //id: { type: String, required: true, unique: true },
    //countInStock: { type: Number, required: true },
    //rating: { type: Number, required: true },
    //numReviews: { type: Number, required: true },
    //reviews: [reviewSchema],
    // interested:[
    //     {
    //         type: mongoose.Schema.Types.ObjectID, 
    //         ref: 'User'
    //     }
    // ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;