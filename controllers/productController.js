import Product from '../models/Product.js'

const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        console.log(`Product with id ${newProduct._id} created.`)
        res.status(201).json({message: `Product with id ${newProduct._id} created.`})
    }
    catch(err) {
        // This is a duplicate key error code
        if (err.code === 11000) {
            console.error('Duplicate key error:', err.message);
            // Parse the error to find the specific field that caused the issue
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({message: `Duplicate: That ${field} already exists.`})
        }
        res.status(400).json({message: err.message})
    }
}

const getProducts = async (req, res) => {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query
    const filters = {}
    const sort = []
    const skip = ((page<1 ? 1 : page) - 1) * (limit<1 ? 10 : limit)
    if(category) filters.category = category
    if(minPrice||maxPrice) filters.price = {}
    if(minPrice) filters.price.$gte = minPrice
    if(maxPrice) filters.price.$lte = maxPrice
    if(sortBy) sort.push(sortBy.split('_'))
    try {
        const products = await Product.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(limit)
        console.log(`Products found (${products.length}): `, products)
        res.status(200).json(products)
    }
    catch(err) {
        console.error(err.message)
        res.status(400).json({message: err.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.find({_id: id})
        if(!product){ throw new Error(`No product with id ${id} found.`)}
        console.log(`Product with id ${product._id} found.`, product)
        res.status(200).json(product)
    }
    catch(err) {
        console.error(err.message)
        res.status(404).json({message: err.message})
    }
}

const replaceProductById = async (req, res) => {
    try {
        const id = req.params.id
        const updatedProduct = await Product.findOneAndReplace({_id: id}, req.body, {new: true, runValidators:true})
        if(!updatedProduct){ throw new Error(`No product with id ${id} found.`)}
        console.log(`Product with id ${updatedProduct._id} updated.`, updatedProduct)
        res.status(200).json({message: `Product with id ${updatedProduct._id} updated.`})
    }
    catch(err) {
        // This is a duplicate key error code
        if (err.code === 11000) {
            console.error('Duplicate key error:', err.message);
            // Parse the error to find the specific field that caused the issue
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({message: `Duplicate: That ${field} already exists.`})
        }
        console.error(err.message)
        res.status(404).json({message: err.message})
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){ throw new Error(`No product with id ${id} found.`)}
        console.log(`Product with id ${deletedProduct._id} found.`, deletedProduct)
        res.status(200).json({message: `Product with id ${deletedProduct._id} deleted.`})
    }
    catch(err) {
        console.error(err)
        console.error(err.message)
        res.status(404).json({message: err.message})
    }
}

export default { createProduct, getProducts, getProductById, replaceProductById, deleteProductById }