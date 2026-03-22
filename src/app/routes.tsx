import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Admin } from './pages/Admin';
import { Orders } from './pages/Orders';
import { Contact } from './pages/Contact';
import { Shipping } from './pages/Shipping';
import { Returns } from './pages/Returns';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'products/:slug', Component: ProductDetails },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'login', Component: Login },
      { path: 'account', Component: Account },
      { path: 'account/orders', Component: Orders },
      { path: 'wishlist', Component: Wishlist },
      { path: 'order-confirmation/:orderId', Component: OrderConfirmation },
      { path: 'admin', Component: Admin },
      // Footer Links Pages
      { path: 'contact', Component: Contact },
      { path: 'shipping', Component: Shipping },
      { path: 'returns', Component: Returns },
      { path: 'faq', Component: FAQ },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
    ],
  },
]);