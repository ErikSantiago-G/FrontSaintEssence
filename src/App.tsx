import { Route, Routes } from 'react-router'
import { PublicRoute } from './guards/PublicRoute'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { AdminDashboardHome } from './pages/Admin/AdminDashboardHome/AdminDashboardHome'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancel from './pages/CheckoutCancel'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Auth/Profile'
import Orders from './pages/Orders'
import News from './pages/News'
import NewsDetails from './pages/NewsDetails'
import NotFound from './pages/NotFound'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Contact from './pages/Contact/Contact'
import BannersAdmin from './pages/Admin/AdminBanners/AdminBanners'
import NewsAdmin from './pages/Admin/AdminNews/AdminNews'
import SectionsAdmin from './pages/Admin/AdminSections/AdminSections'
import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'
import AdminProducts from './pages/Admin/AdminProducts/AdminProducts'
import AdminCategories from './pages/Admin/AdminCategories/AdminCategories'
import AdminOrders from './pages/Admin/AdminOrders/AdminOrders'

function App() {
  return (
    <Routes>
        <Route>
          {/* Rutas públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />

            {/* Productos públicos */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/slug/:slug" element={<ProductDetails />} />

            {/* Categorías públicas */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryProducts />} />
            <Route path="/categories/slug/:slug" element={<CategoryProducts />} />

            {/* Noticias públicas */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/news/slug/:slug" element={<NewsDetails />} />

            {/* Autenticación */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Carrito y Checkout */}
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />

            <Route path="/contact" element={<Contact />} />
            {/* Órdenes del usuario */}
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Route>

          {/* Panel de administración */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requireAdmin><AdminDashboardHome /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute requireAdmin><AdminProducts /></ProtectedRoute>} />
            <Route path="categories" element={<ProtectedRoute requireAdmin><AdminCategories /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute requireAdmin><AdminOrders /></ProtectedRoute>} />
            <Route path="banners" element={<ProtectedRoute requireAdmin><BannersAdmin /></ProtectedRoute>} />
            <Route path="news" element={<ProtectedRoute requireAdmin><NewsAdmin /></ProtectedRoute>} />
            <Route path="sections" element={<ProtectedRoute requireAdmin><SectionsAdmin /></ProtectedRoute>} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  )
}

export default App
