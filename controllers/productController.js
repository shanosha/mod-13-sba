import Product from '../models/Product.js'

const getRequiredFields = (model) => {
    const requiredFields = []
    model.schema.eachPath(filedName => {
        const schemaProperty = model.schema.path(filedName)
        if (schemaProperty.options.required) {
            requiredFields.push(filedName)
        }
    })
    return requiredFields
}

const createProduct = async (req, res) => {
    const requiredProperties = getRequiredFields(Product)
    let missingFields = []
    for (const field of requiredProperties) {
        if(!req.body[field]) missingFields.push(field)
    }
    if(missingFields.length > 0) {
        return res.status(400).json({message: `Missing required fields: ${missingFields.join(", ")}`})
    }
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    }
    catch(err) {
        console.error(err.message)
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
        if (!product) {
            return res.status(404).json({ message: `No product with id ${id} found.`})
        }
        res.status(200).json(product)
    }
    catch(err) {
        console.error(err.message)
        res.status(500).json({message: err.message})
    }
}

const replaceProductById = async (req, res) => {
    const requiredProperties = getRequiredFields(Product)
    let missingFields = []
    for (const field of requiredProperties) {
        if(!req.body[field]) missingFields.push(field)
    }
    if(missingFields.length > 0) {
        return res.status(400).json({message: `Missing required fields: ${missingFields.join(", ")}`})
    }
    try {
        const id = req.params.id
        const updatedProduct = await Product.findOneAndReplace({_id: id}, req.body, {new: true, runValidators:true})
        if (!updatedProduct) {
            return res.status(404).json({ message: `No product with id ${id} found.`})
        }
        res.status(200).json(updatedProduct)
    }
    catch(err) {
        console.error(err.message)
        res.status(400).json({message: err.message})
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ message: `No product with id ${id} found.`})
        }
        res.status(200).json({message: `Product with id ${deletedBook._id} deleted.`})
    }
    catch(err) {
        console.error(err.message)
        res.status(500).json({message: err.message})
    }
}

export default { createProduct, getProducts, getProductById, replaceProductById, deleteProductById }