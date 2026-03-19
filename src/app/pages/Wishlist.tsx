import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Heart } from 'lucide-react';
import { SEO } from '../utils/seo';

export const Wishlist = () => {
  const { wishlist } = useApp();

  return (
    <>
      <SEO title="My Wishlist | Dot & Key" description="View your saved products" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          My Wishlist ({wishlist.length} items)
        </h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-24 w-24 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save products you love to your wishlist and shop them later!
              </p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};
