import { Route, Routes } from 'react-router-dom'

import ListCategories from '../pages/(admin)/categories/List'
import Dashboard from '../pages/(admin)/Dashboard'
import LayoutAdmin from '../pages/(admin)/LayoutAdmin'
import FormProduct from '../pages/(admin)/products/FormSubmit'
import ListProductsAdmin from '../pages/(admin)/products/List'
import FormSubmitCategory from '../pages/(admin)/categories/FormSubmit'

import LayoutClient from '../pages/(client)/LayoutClient'
import HomePage from '../pages/(client)/HomePage'

import NotFound from '../pages/NotFound'
import ListProducts from '../pages/(client)/products/List'
import DetailsProduct from '../pages/(client)/products/Details'

import FormSubmitAuth from '../pages/Auth/FormSubmit'
import Test from '../pages/Test'
import DetailsCategory from '../pages/(client)/categories/Details'
import WishList from '../pages/(client)/wishlist/List'

// type Props = {}

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />

                    {/* Endpoint Products */}
                    <Route path='/admin/products' element={<ListProductsAdmin />} />
                    <Route path='/admin/products/create' element={<FormProduct />} />
                    <Route path='/admin/products/update/:id' element={<FormProduct />} />
                    <Route path='/admin/products/details' element={''} />

                    {/* Endpoint Categories */}
                    <Route path='/admin/categories' element={<ListCategories />} />
                    <Route path='/admin/categories/create' element={<FormSubmitCategory />} />
                    <Route path='/admin/categories/update/:id' element={<FormSubmitCategory />} />
                </Route>

                <Route path='/' element={<LayoutClient />}>
                    <Route index element={<HomePage />} />

                    {/* Endpoint Products */}
                    <Route path='/products' element={<ListProducts /> } />
                    <Route path='/products/create' element={''} />
                    <Route path='/products/update/:id' element={''} />
                    <Route path='/products/details/:id' element={<DetailsProduct />} />

                    {/* Endpoint Categories */}
                    <Route path='/categories' element={''} />
                    <Route path='/categories/:id' element={<DetailsCategory />} />
                    <Route path='/categories/update/:id' element={''} />

                    <Route path='/wishlist' element={<WishList />}/> 
                </Route>


                {/* Auth routing */}
                <Route path='/login' element={<FormSubmitAuth />} />
                <Route path='/register' element={<FormSubmitAuth />} />

                <Route path='/test' element={<Test />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Routing