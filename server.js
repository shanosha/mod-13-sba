import 'dotenv/config'
import './db/connection.js'
import express from 'express'
import routes from './routes/productRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/products', routes)

app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})