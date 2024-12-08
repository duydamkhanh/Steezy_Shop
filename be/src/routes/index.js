import routeAuth from "./auth.js"
import routeCategory from "./category.js"
import routeProduct from "./product.js"

const router = (app) => {
    app.use('/api/v1/products',routeProduct) // For Endpoint Products
    app.use('/api/v1/categories', routeCategory) // For Endpoint Categories
    app.use('/api/v1/auth', routeAuth) // For Endpoint Auth
}

export default router