import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SEO } from '../utils/seo';

export const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();
  
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Link to="/account/orders">
          <Button>View All Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title="Order Confirmation | Dot & Key" description="Your order has been placed successfully" />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600">Thank you for your purchase</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="text-2xl font-bold text-purple-600 mb-4">{order.id}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p className="text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-purple-600">₹{order.total.toFixed(2)}</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-semibold capitalize">{order.paymentMethod}</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-green-600 capitalize">{order.status}</p>
                </div>
              </div>
            </div>

            <div className="text-left mb-6">
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 border-b pb-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold text-purple-600">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-left mb-6">
              <h3 className="font-semibold mb-2">Delivery Address</h3>
              <p className="text-gray-700">{order.address.name}</p>
              <p className="text-gray-700">{order.address.addressLine1}</p>
              {order.address.addressLine2 && <p className="text-gray-700">{order.address.addressLine2}</p>}
              <p className="text-gray-700">
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="text-gray-600 mt-1">Phone: {order.address.phone}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your registered email address.
              </p>
              <div className="flex gap-3">
                <Link to="/account/orders" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </Link>
                <Link to="/products" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
